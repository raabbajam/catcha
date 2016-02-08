import {exec} from 'child_process';
import path from 'path';

/**
 * @param {Type}
 * @return {Type}
 */
export default function (settings) {
  const defaults = {
    deleteTemporaryImage: true,
    deleteSourceImage: false,
    resolveBeforeCleaning: true,
  };
  const options = Object.assign({}, settings, defaults);
  return (imagePath) => new Promise((resolve, reject) => {
    const {convertCommand, imageTmpPath} =
      generateConvertCommandAndOutputPath(imagePath, options.transforms);
    exec(convertCommand, (error) => {
      if (error) {
        return reject(error);
      }
      exec(`tesseract ${imageTmpPath} stdout\
        ${options.digitOnly ? ' digits' : ''}`, (error2, text) => {
        if (error2) {
          return reject(error2);
        }
        text = text.trim();
        if (options.digitOnly) {
          text = text.replace(/[^A-z\d]/, '');
        }
        if (options.resolveBeforeCleaning) {
          resolve(text);
        }
        return cleaning({options, imagePath, imageTmpPath})
          .then(() => {
            const resolveAfterCleaning = !options.resolveBeforeCleaning;
            if (resolveAfterCleaning) {
              return resolve(text);
            }
          });
      });
    });
  });
}

function generateConvertCommandAndOutputPath(imagePath, transforms) {
  const imageName = path.basename(imagePath);
  const imageTmpName = imageName.replace(path.extname(imageName), '.tiff');
  const imageTmpPath = path.resolve(__dirname, '.tmp', imageTmpName);
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

function deleteFile() {
  return Promise.resolve();
}
