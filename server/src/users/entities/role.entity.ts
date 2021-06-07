import {
  Column,
  DataType,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { RoleInterfaces } from '../interfaces/user.interfaces';
import { User } from './user.entity';

@Table
export class Role extends Model<RoleInterfaces> {
  @Column(DataType.TEXT)
  name;

  @HasOne(() => User, 'RoleId')
  user;
}
