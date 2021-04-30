import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RecoveryPasswordDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty({ message: 'Введите email' })
  @IsEmail(undefined, { message: 'Email имеет ошибочный формат' })
  email: string;
}
