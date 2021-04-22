import { FILE_SERVICE, USER_REPOSITORY } from 'src/constants';
import { User } from 'src/users/entities/user.entity';
import { FileService } from '../file/file.service';

export const usersProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
  {
    provide: FILE_SERVICE,
    useValue: new FileService(),
  },
];
