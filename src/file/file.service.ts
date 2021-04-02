import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'

export enum FileType {
  IMAGE = 'image'
}


@Injectable()
export class FileService {

  createFile(type: FileType, file): string {
    try {
      // сохраняем расширение файла
      const fileExtension = file.originalname.split('.').pop()

      // делаем уникальное имя файла
      const fileName = uuid.v4() + fileExtension

      // сохраняем путь файла
      const filePath = path.resolve(__dirname, '..', 'static')

      // проверяем доступность этого пути, если папки нет - создать
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, {recursive: true})
      }
      fs.writeFileSync((filePath + fileName), file.buffer)
      return type + '/' + fileName
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  removeFile(fileName: string) {

  }

}
