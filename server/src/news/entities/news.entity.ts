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
  title;

  @Column(DataType.TEXT)
  content;

  @Column({ defaultValue: null, type: DataType.TEXT })
  image;

  @Column({
    defaultValue: [12, 11, 22],
    type: DataType.ARRAY(DataType.INTEGER),
  })
  like: number[];

  @Column({
    defaultValue: [12, 11, 22],
    type: DataType.ARRAY(DataType.INTEGER),
  })
  dislike;

  @HasMany(() => Comment, 'NewsId')
  comments: Comment[];

  @BelongsTo(() => User, 'UserId')
  userId: number;
}