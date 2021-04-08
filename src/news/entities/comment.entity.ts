import { Column, Model, Table } from 'sequelize-typescript';
import { CommentInterfaces } from '../interfaces/commnet.interfaces';

@Table
export class Comment extends Model<CommentInterfaces> {
  @Column
  user_id: string;

  @Column
  name: string;

  @Column
  text: string;
}
