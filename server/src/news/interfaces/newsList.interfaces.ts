import { News } from '../entities/news.entity';

export interface NewsListInterfaces extends News {
  id?: number;
  like: number[];
  dislike: number[];
}

export interface NewsResponse {
  news: NewsListInterfaces[];
  page: number;
  lastPage: number;
}
