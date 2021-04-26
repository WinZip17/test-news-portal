import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';
import { CommentInterfaces } from '../interfaces/commnet.interfaces';
import { News } from './news.entity';

@Table
export class Comment extends Model<CommentInterfaces> {
  @Column(DataType.TEXT)
  content: string;

  @BelongsTo(() => News, 'NewsId')
  news: number;

  @BelongsTo(() => User, 'UserId')
  user: User;
}
