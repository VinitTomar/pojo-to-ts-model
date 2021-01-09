import { writeFile } from "fs";

const fileWriter = async (fileName: string, content: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    writeFile(fileName, content, (err) => {
      if(err)
        reject(err);
      else
        resolve();
    });
  });
};

export {
  fileWriter
}