import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  NotEmpty,
} from 'sequelize-typescript';
import { NewsInterfaces } from '../interfaces/news.interfaces';
import { Comment } from './comment.entity';

@Table
export class News extends Model<NewsInterfaces> {
  @NotEmpty({ msg: 'ну нах' })
  @Column(DataType.TEXT)
  title: string;

  @Column(DataType.TEXT)
  content: string;

  @Column({ defaultValue: null })
  image: string | null;

  @Column({ defaultValue: 0 })
  like: number;

  @Column({ defaultValue: 0 })
  dislike: number;

  @HasMany(() => Comment)
  comments: Comment[];
}
