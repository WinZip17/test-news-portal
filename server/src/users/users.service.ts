import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FILE_SERVICE, USER_REPOSITORY } from '../constants';
import { User } from './entities/user.entity';
import { FileService, FileType } from '../file/file.service';

const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: typeof User,
    @Inject(FILE_SERVICE) private fileService: FileService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    return user;
  }

  async findOne(
    email: string,
    scope: string = 'minimal',
  ): Promise<User | undefined> {
    return this.userRepository.scope(scope).findOne({
      where: {
        email,
      },
    });
  }

  async update(updateUserDto: UpdateUserDto, file): Promise<User> {
    const { email } = updateUserDto;
    const updateUser = await this.findOne(email, 'full');
    const match = await bcrypt.compare(
      updateUserDto.password,
      updateUser.password,
    );
    delete updateUserDto.password;
    if (!match) {
      throw new HttpException(
        'Введен не правильный пароль',
        HttpStatus.BAD_REQUEST,
      );
    }
    let saveImage;
    if (file) {
      await this.fileService.removeFile(updateUser.avatar);
      saveImage = await this.fileService.createFile(FileType.IMAGE, file);
    }
    Object.assign(updateUser, { ...updateUserDto, avatar: saveImage });
    await updateUser.save();
    const sendUser = await this.findOne(updateUser.email, 'minimal');
    return sendUser;
  }
}
