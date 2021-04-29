import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateNewsDto {
  @MinLength(5, { message: 'Заголовок минимум 5 символов' })
  @MaxLength(50, { message: 'Заголовок максимум 50 символов' })
  @IsNotEmpty({ message: 'Заголовок обязателен' })
  title: string;

  @MinLength(5, { message: 'Контент минимум 5 символов' })
  @MaxLength(500, { message: 'Контент максимум 500 символов' })
  @IsNotEmpty({ message: 'Контент обязателен' })
  content: string;

  image: string | null;
}
