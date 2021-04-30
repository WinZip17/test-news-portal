import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    type: String,
  })
  @MaxLength(2000, { message: 'Комментарий максимум 2000 символов' })
  @IsNotEmpty({ message: 'Напишите комментарий!!!' })
  content: string;

  @ApiProperty({
    type: Number,
  })
  @IsNotEmpty()
  NewsId: number;
}
