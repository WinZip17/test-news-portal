import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty({ message: 'Введите email' })
  @IsEmail(undefined, { message: 'Email имеет ошибочный формат' })
  email: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty({ message: 'Введите имя' })
  name: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty({ message: 'Введите пароль' })
  password: string;

  @ApiProperty({
    type: Object,
    required: false,
  })
  avatar?: any;

  RoleId: number;
}
