import { readFile } from 'fs';

const fileReader = (fileName: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    readFile(fileName, (err, dataBuffer) => {
      if (!err) {
        resolve(dataBuffer);
      } else {
        reject(err);
      }
    });
  });
};

export {
  fileReader
}