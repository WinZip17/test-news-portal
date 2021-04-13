import {
  Column,
  DataType,
  DefaultScope,
  HasOne,
  Model,
  Scopes,
  Table,
} from 'sequelize-typescript';
import { UserInterfaces } from '../interfaces/user.interfaces';
import { Comment } from '../../news/entities/comment.entity';

@DefaultScope(() => ({
  attributes: ['id', 'email', 'name'],
}))
@Scopes(() => ({
  full: {},
  minimal: {
    attributes: ['id', 'email', 'name'],
  },
}))
@Table
export class User extends Model<UserInterfaces> {
  @Column(DataType.TEXT)
  email;

  @Column(DataType.TEXT)
  name;

  @Column(DataType.TEXT)
  password;

  @Column({
    defaultValue: '1111',
    type: DataType.TEXT,
  })
  confirmationCode;

  @Column({
    defaultValue: false,
    type: DataType.BOOLEAN,
  })
  isConfirmed;

  @Column({
    defaultValue: false,
    type: DataType.BOOLEAN,
  })
  isBlocked;

  @HasOne(() => Comment, 'UserId')
  comment;

  @HasOne(() => Comment, 'UserId')
  news;
}
