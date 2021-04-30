import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty({ message: 'Введите пароль' })
  password: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty({ message: 'Введите новый пароль' })
  newPassword: string;
}
