import {IsEmail, IsNotEmpty} from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'Введите email' })
  @IsEmail(undefined, { message: 'Email имеет ошибочный формат' } )
  email: string;

  @IsNotEmpty({ message: 'Введите пароль' })
  password: string;
}
