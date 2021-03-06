import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

export enum FileType {
  IMAGE = 'image',
}

export const fsCreateFile = (type, file, isAdminBro = false) => {
  const fileExtension = file[isAdminBro ? 'name' : 'originalname']
    .split('.')
    .pop();

  // делаем уникальное имя файла
  const fileName = uuid.v4() + '.' + fileExtension;

  // сохраняем путь файла
  const filePath = path.resolve(
    __dirname,
    '..',
    '..',
    'public',
    'static',
    type,
  );

  // проверяем доступность этого пути, если папки нет - создать
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath, { recursive: true });
  }
  const writeFile = isAdminBro ? fs.readFileSync(file.path) : file.buffer;

  // сохраняем файл
  fs.writeFileSync(filePath + '/' + fileName, writeFile);

  // возвращаем путь для сохранения в базе
  return type + '/' + fileName;
};

export const fsRemoveFile = (filePath) => {
  if (filePath) {
    const fileDirPath = path.resolve(__dirname, '..', '..', 'public', 'static');
    // удаляем файл
    if (!fs.existsSync(fileDirPath + '/' + filePath)) {
      fs.unlinkSync(fileDirPath + '/' + filePath);
      return 'файл удален';
    }
  }
  return 'файл не удален';
};

@Injectable()
export class FileService {
  createFile(type: FileType, file): string {
    try {
      // сохраняем расширение файла
      if (file) {
        return fsCreateFile(type, file);
      }
      return null;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  removeFile(filePath: string): string {
    try {
      return fsRemoveFile(filePath);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
