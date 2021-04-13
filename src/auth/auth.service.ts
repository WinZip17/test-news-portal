import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ChangePasswordDto } from 'src/users/dto/change-password.dto';
import { RecoveryPasswordDto } from '../users/dto/recovery-password.dto';
import * as uuid from 'uuid';

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userName: string): Promise<any> {
    const user = await this.usersService.findValidateUser(userName);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    if (user.isBlocked) {
      throw new HttpException(
        'Пользователь заблокирован, вам поможет только чудо',
        HttpStatus.FORBIDDEN,
      );
    }
    const { name, email, id } = user;
    return { name, email, id };
  }

  async login(data: LoginUserDto) {
    const { email, password: loginPassword } = data;
    const user: User = await this.usersService.findOne(email, 'full');
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

  async registration(createUserDto: CreateUserDto) {
    const user: User = await this.usersService.findOne(createUserDto.email);
    if (user) {
      throw new HttpException(
        'Пользователь с таким e-mail уже зарегистрирован',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hash = bcrypt.hashSync(createUserDto.password, 10);
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hash,
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
    console.log('это мог быть код подтверждения: ', confirmationCode);

    user.confirmationCode = '1111';
    await user.save();
    throw new HttpException(
      'код успешно успешно отправлен в консоль сервера :) (можно попробовать 1111)',
      HttpStatus.OK,
    );
  }
}
