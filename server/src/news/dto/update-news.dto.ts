import { PartialType } from '@nestjs/mapped-types';
import { CreateNewsDto } from './create-news.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNewsDto extends PartialType(CreateNewsDto) {
  @ApiProperty({
    type: Array(Number),
  })
  like?: number[];

  @ApiProperty({
    type: Array(Number),
  })
  dislike?: number[];
}
