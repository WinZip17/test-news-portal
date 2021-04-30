import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty({ message: 'Введите email' })
  email: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty({ message: 'Введите пароль' })
  password: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty({ message: 'Введите код' })
  code: string;
}
