const {readdir} = require('fs');
const path = require('path');
const Promise = require('bluebird');

const readdirAsync = Promise.promisify(readdir);
module.exports = {
  getTestData,
};
function getTestData(difficulity) {
  const testPath = path.resolve(__dirname, 'images', difficulity);
  return readdirAsync(testPath)
    .then((files) => files.map(getFullPathAndExpectedText));

  function getFullPathAndExpectedText(image) {
    const filePath = path.resolve(testPath, image);
    const text = path.parse(image).name;
    return {path: filePath, text};
  }
}
