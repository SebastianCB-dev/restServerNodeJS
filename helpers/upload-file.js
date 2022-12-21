import { v4 } from 'uuid';
import path from 'path';

import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const uploadFile = (files, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {

  return new Promise( (res, rej) => {

    const { file } = files;

    const nameCut = file.name.split('.');
    const extension = nameCut[nameCut.length - 1];

    if (!validExtensions.includes(extension)) {
      return rej(`The file extension is not valid. Valid extensions: ${validExtensions.join(', ')}`);
    }

    const nameTmp = v4() + '.' + extension;
    const uploadPath = path.join(__dirname, '../uploads/', folder, nameTmp);

    file.mv(uploadPath, function (err) {
      if (err) {
        return rej(err)
      }

      res(nameTmp);
    });
  });
  
}