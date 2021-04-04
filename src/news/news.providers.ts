import { NEWS_REPOSITORY } from 'src/constants';
import { News } from './entities/news.entity';

export const newsProviders = [
  {
    provide: NEWS_REPOSITORY,
    useValue: News,
  },
];
