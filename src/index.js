const Promise = require('bluebird');
const debug = require('debug')('catcha');
const {exec} = require('child_process');
const {ensureDir, remove} = require('fs-extra');
const execAsync = Promise.promisify(exec);
const ensureDirAsync = Promise.promisify(ensureDir);
const removeAsync = Promise.promisify(remove);
const path = require('path');
module.exports = function Catcha(settings = {}) {
  const defaults = {
    temporarypath: path.resolve(__dirname, '../.tmp'),
    deleteTemporaryImage: true,
    deleteSourceImage: false,
    resolveBeforeCleaning: true,
    transformFunction: (text) => text,
  };
  const options = Object.assign({}, defaults, settings);
  return (imagePath) => {
    const {convertCommand, imageTmpPath} =
      generateConvertCommandAndOutputPath(options.temporarypath, imagePath, options.transforms);
    const {dir: imageTmpDir} = path.parse(imageTmpPath);
    const tesseractCommand = `tesseract ${imageTmpPath} stdout ${options.digitOnly ? ' digits' : ''}`;
    debug({imageTmpDir, convertCommand, tesseractCommand});
    return Promise.resolve()
      .then(() => ensureDirAsync(imageTmpDir))
      .then(() => execAsync(convertCommand))
      .then(() => execAsync(tesseractCommand))
      .then((text) => {
        text = text.trim();
        text = text.replace(/\s/g, '');
        if (options.digitOnly) {
          text = text.replace(/[^A-z\d]/, '');
        }
        text = options.transformFunction(text);
        debug({text});
        if (options.resolveBeforeCleaning) {
          cleaning({options, imagePath, imageTmpPath});
          return text;
        }
        return cleaning({options, imagePath, imageTmpPath})
          .tap(debug)
          .then(() => text);
      });
  };
};
function generateConvertCommandAndOutputPath(temporarypath, imagePath, transforms) {
  const imageName = path.basename(imagePath);
  const imageTmpName = imageName.replace(path.extname(imageName), '.tiff');
  const imageTmpPath = path.resolve(temporarypath, imageTmpName);
  transforms = transforms.map((option) =>
    `-${option.key} ${option.value || ''}`.trim());
  const convertCommand = ['convert', imagePath, ...transforms, imageTmpPath].join(' ');
  return {convertCommand, imageTmpPath};
}

function cleaning({options, imagePath, imageTmpPath}) {
  const actions = [];
  if (options.deleteSourceImage) {
    actions.push(deleteFile(imagePath));
  }
  if (options.deleteTemporaryImage) {
    actions.push(deleteFile(imageTmpPath));
  }
  return actions.length ?
    Promise.all(actions) :
    Promise.resolve();
}

function deleteFile(filepath) {
  return removeAsync(filepath).return(true).catchReturn(false);
}
