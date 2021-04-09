import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';
import { CommentInterfaces } from '../interfaces/commnet.interfaces';
import { News } from './news.entity';

@Table
export class Comment extends Model<CommentInterfaces> {
  @Column(DataType.TEXT)
  name: string;

  @Column(DataType.TEXT)
  text: string;

  @ForeignKey(() => News)
  @Column
  newsId: number;

  @BelongsTo(() => User, 'myUserId')
  user: User;
}
