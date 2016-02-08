import { exec } from 'child_process';
/**
 * @param {Type}
 * @return {Type}
 */
export default function () {
  return (imagePath) => new Promise((resolve, reject) => {
    exec(`tesseract ${imagePath} stdout digits`, (error, text) => {
      if (error) {
        return reject(error);
      }
      text = text.trim();
      return resolve(text);
    });
  });
}
