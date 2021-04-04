import { Table, Column, Model } from 'sequelize-typescript';
import { NewsInterfaces } from '../interfaces/news.interfaces';

@Table
export class News extends Model<NewsInterfaces> {
  @Column
  title: string;

  @Column
  content: string;

  @Column
  image: string | null;
}
