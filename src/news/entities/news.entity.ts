import { Table, Column, Model } from 'sequelize-typescript';
import { DataTypes } from 'sequelize/types';
import { NewsInterfaces } from '../interfaces/news.interfaces';

@Table
export class News extends Model<NewsInterfaces> {
  @Column({ validate: { notEmpty: true } })
  title: string;

  @Column({ validate: { notEmpty: true } })
  content: string;

  @Column({ defaultValue: null })
  image: string | null;

  @Column({ defaultValue: 0 })
  like: number;

  @Column({ defaultValue: 0 })
  dislike: number;
}
