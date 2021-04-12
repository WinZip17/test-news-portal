import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';
import { UserInterfaces } from '../interfaces/user.interfaces';
import { Comment } from '../../news/entities/comment.entity';

@Table
export class User extends Model<UserInterfaces> {
  @Column(DataType.TEXT)
  email;

  @Column(DataType.TEXT)
  name;

  @Column(DataType.TEXT)
  password;

  @HasOne(() => Comment, 'UserId')
  comment;

  @HasOne(() => Comment, 'UserId')
  news;
}
