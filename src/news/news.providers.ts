import { COMMENTS_REPOSITORY, NEWS_REPOSITORY } from 'src/constants';
import { News } from './entities/news.entity';
import { Comment } from './entities/comment.entity';

export const newsProviders = [
  {
    provide: NEWS_REPOSITORY,
    useValue: News,
  },
  {
    provide: COMMENTS_REPOSITORY,
    useValue: Comment,
  },
];
