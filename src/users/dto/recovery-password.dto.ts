import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RecoveryPasswordDto extends PartialType(CreateUserDto) {
  @IsNotEmpty({ message: 'Введите email' })
  @IsEmail(undefined, { message: 'Email имеет ошибочный формат' })
  email: string;
}
