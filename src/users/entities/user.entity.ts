import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';
import { UserInterfaces } from '../interfaces/user.interfaces';
import { Comment } from '../../news/entities/comment.entity';

@Table
export class User extends Model<UserInterfaces> {
  @Column(DataType.TEXT)
  email: string;

  @Column(DataType.TEXT)
  name: string;

  @HasOne(() => Comment, 'myUserId')
  comment;
}
