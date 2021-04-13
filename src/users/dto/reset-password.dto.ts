import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

export class ResetPasswordDto extends PartialType(CreateUserDto) {
  @IsNotEmpty({ message: 'Введите пароль' })
  password: string;

  @IsNotEmpty({ message: 'Введите код' })
  code: string;
}
