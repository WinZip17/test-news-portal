import { USER_REPOSITORY } from 'src/constants';
import { User } from 'src/users/entities/user.entity';

export const usersProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
