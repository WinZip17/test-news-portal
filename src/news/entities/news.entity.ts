import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  NotEmpty,
  BelongsTo,
} from 'sequelize-typescript';
import { NewsInterfaces } from '../interfaces/news.interfaces';
import { Comment } from './comment.entity';
import { User } from '../../users/entities/user.entity';

@Table
export class News extends Model<NewsInterfaces> {
  @NotEmpty({ msg: 'ну нах' })
  @Column(DataType.TEXT)
  title: string;

  @Column(DataType.TEXT)
  content: string;

  @Column({ defaultValue: null })
  image: string | null;

  @Column({
    defaultValue: [12, 11, 22],
    type: DataType.ARRAY(DataType.INTEGER),
  })
  like: number[];

  @Column({
    defaultValue: [12, 11, 22],
    type: DataType.ARRAY(DataType.INTEGER),
  })
  dislike: number[];

  @HasMany(() => Comment, 'NewsId')
  comments: Comment[];

  @BelongsTo(() => User, 'UserId')
  userId: number;
}
