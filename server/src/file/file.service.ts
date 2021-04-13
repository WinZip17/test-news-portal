import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

export enum FileType {
  IMAGE = 'image',
}

@Injectable()
export class FileService {
  createFile(type: FileType, file): string {
    try {
      // сохраняем расширение файла
      if (file) {
        const fileExtension = file.originalname.split('.').pop();

        // делаем уникальное имя файла
        const fileName = uuid.v4() + '.' + fileExtension;

        // сохраняем путь файла
        const filePath = path.resolve(__dirname, '..', 'static', type);

        // проверяем доступность этого пути, если папки нет - создать
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath, { recursive: true });
        }

        // сохраняем файл
        fs.writeFileSync(filePath + '/' + fileName, file.buffer);

        // возвращаем путь для сохранения в базе
        return type + '/' + fileName;
      }
      return null;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  removeFile(filePath: string): string {
    try {
      if (filePath) {
        const fileDirPath = path.resolve(__dirname, '..', 'static');
        // удаляем файл
        fs.unlinkSync(fileDirPath + '/' + filePath);
        return 'файл удален';
      }
      return 'файл не удален';
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
