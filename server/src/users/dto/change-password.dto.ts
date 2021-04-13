import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

export class ChangePasswordDto extends PartialType(CreateUserDto) {
  @IsNotEmpty({ message: 'Введите пароль' })
  password: string;

  @IsNotEmpty({ message: 'Введите новый пароль' })
  newPassword: string;
}