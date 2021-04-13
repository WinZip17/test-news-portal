import {
  COMMENTS_REPOSITORY,
  FILE_SERVICE,
  NEWS_REPOSITORY,
} from 'src/constants';
import { News } from './entities/news.entity';
import { Comment } from './entities/comment.entity';
import { FileService } from '../file/file.service';

export const newsProviders = [
  {
    provide: NEWS_REPOSITORY,
    useValue: News,
  },
  {
    provide: COMMENTS_REPOSITORY,
    useValue: Comment,
  },
  {
    provide: FILE_SERVICE,
    useValue: new FileService(),
  },
];
