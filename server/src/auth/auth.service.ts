import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ChangePasswordDto } from 'src/users/dto/change-password.dto';
import { RecoveryPasswordDto } from '../users/dto/recovery-password.dto';
import * as uuid from 'uuid';
import { MailerService } from '@nestjs-modules/mailer';
import { ResetPasswordDto } from 'src/users/dto/reset-password.dto';
import { FileService, FileType } from '../file/file.service';
import { FILE_SERVICE } from '../constants';

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    @Inject(FILE_SERVICE) private fileService: FileService,
  ) {}

  async validateUser(findEmail: string): Promise<any> {
    console.log('сюда попадаем?', findEmail)
    const user = await this.usersService.findOne(findEmail, 'full');
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    if (user.isBlocked) {
      throw new HttpException(
        'Пользователь заблокирован, вам поможет только чудо',
        HttpStatus.FORBIDDEN,
      );
    }
    const { name, email, id, avatar } = user;
    return { name, email, id, avatar };
  }

  async login(data: LoginUserDto) {
    const { email, password: loginPassword } = data;
    const user: User = await this.usersService.findOne(email, 'full');
    if (!user) {
      throw new HttpException(
        'Неправильный логин или пароль',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const match = await bcrypt.compare(loginPassword, user.password);
    if (user && match) {
      const sendUser: User = await this.usersService.findOne(email);
      const payload = { username: user.name, sub: user.id, email: user.email };
      return {
        user: sendUser,
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new HttpException(
      'Неправильный логин или пароль',
      HttpStatus.UNAUTHORIZED,
    );
  }

  async registration(createUserDto: CreateUserDto, file) {
    const user: User = await this.usersService.findOne(createUserDto.email);
    if (user) {
      throw new HttpException(
        'Пользователь с таким e-mail уже зарегистрирован',
        HttpStatus.BAD_REQUEST,
      );
    }
    const saveImage = await this.fileService.createFile(FileType.IMAGE, file);

    const hash = bcrypt.hashSync(createUserDto.password, 10);
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hash,
      avatar: saveImage || null,
    });
    if (newUser) {
      throw new HttpException(
        'Вы успешно зарегистрированы!',
        HttpStatus.CREATED,
      );
    }
  }

  async changePassword(data: ChangePasswordDto) {
    const { email, password, newPassword } = data;
    const user: User = await this.usersService.findOne(email, 'full');
    if (!user) {
      throw new HttpException('Неизвестная ошибка', HttpStatus.BAD_REQUEST);
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new HttpException(
        'Введен не правильный старый пароль',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hash = bcrypt.hashSync(newPassword, 10);
    user.password = hash;
    await user.save();
    throw new HttpException('Пароль успешно изменен', HttpStatus.OK);
  }

  async recoveryPassword(data: RecoveryPasswordDto) {
    const { email } = data;
    const user: User = await this.usersService.findOne(email, 'full');
    if (!user || user.isBlocked) {
      throw new HttpException(
        'По данному email восстановление не возможно',
        HttpStatus.BAD_REQUEST,
      );
    }
    const confirmationCode = uuid.v4().slice(0, 4);
    user.confirmationCode = confirmationCode;
    await user.save();
    try {
      await this.mailerService.sendMail({
        to: email,
        from: process.env.MAIL_FROM_ADDRESS,
        subject: 'вот вам код для восстановления парольки ',
        text: `Ваш код ${confirmationCode}`,
        html: `Ваш код <b>${confirmationCode}</b>`,
      });
      throw new HttpException(
        'код успешно успешно отправлен :) (если не подходит, то можно попробовать 1111)',
        HttpStatus.OK,
      );
    } catch (e) {
      // TODO: почему любой результат попадает в catch?!?!?!
      if (e.status !== 200) {
        throw new HttpException(
          'к сожалению что то пошло не так, попробуйте позже... :(',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'код успешно успешно отправлен в консоль сервера :) (можно попробовать 1111)',
          HttpStatus.OK,
        );
      }
    }
  }

  async resetPassword(data: ResetPasswordDto) {
    const { email, code, password } = data;
    const user: User = await this.usersService.findOne(email, 'full');
    if (!user) {
      throw new HttpException('Неизвестная ошибка', HttpStatus.BAD_REQUEST);
    }
    if (code !== user.confirmationCode) {
      throw new HttpException('Неправильный код', HttpStatus.BAD_REQUEST);
    }
    const hash = bcrypt.hashSync(password, 10);
    user.password = hash;
    user.confirmationCode = uuid.v4().slice(0, 4);
    await user.save();
    throw new HttpException('Пароль успешно изменен', HttpStatus.OK);
  }
}
