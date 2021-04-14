import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Введите email' })
  @IsEmail(undefined, { message: 'Email имеет ошибочный формат' })
  email: string;

  @IsNotEmpty({ message: 'Введите имя' })
  name: string;

  @IsNotEmpty({ message: 'Введите пароль' })
  password: string;

  @IsNotEmpty({ message: 'Подтвердите пароль' })
  confirmPassword: string;

  avatar?: any;
}
