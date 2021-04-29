import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @MaxLength(2000, { message: 'Комментарий максимум 2000 символов' })
  @IsNotEmpty({ message: 'Напишите комментарий!!!' })
  content: string;

  @IsNotEmpty()
  NewsId: number;
}
