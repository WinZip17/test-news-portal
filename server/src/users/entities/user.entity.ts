import {
  BelongsTo,
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
import { News } from '../../news/entities/news.entity';
import {Role} from "./role.entity";

@DefaultScope(() => ({
  attributes: ['id', 'email', 'name', 'avatar'],
}))
@Scopes(() => ({
  full: {},
  minimal: {
    attributes: ['id', 'email', 'name', 'avatar'],
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

  @Column({
    defaultValue: null,
    type: DataType.TEXT,
  })
  avatar;

  @HasOne(() => Comment, 'UserId')
  comment;

  @HasOne(() => News, 'UserId')
  news;

  @BelongsTo(() => Role, 'RoleId')
  roleId: number;
}
