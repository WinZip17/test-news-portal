import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty({ message: 'Введите email' })
  @IsEmail(undefined, { message: 'Email имеет ошибочный формат' })
  email: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty({ message: 'Введите пароль' })
  password: string;
}
