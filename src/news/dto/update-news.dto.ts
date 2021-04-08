import { PartialType } from '@nestjs/mapped-types';
import { CreateNewsDto } from './create-news.dto';

export class UpdateNewsDto extends PartialType(CreateNewsDto) {
  like?: number;
  dislike?: number;
}
