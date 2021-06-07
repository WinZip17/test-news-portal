import { SEQUELIZE } from 'src/constants';
import { News } from 'src/news/entities/news.entity';
import { Comment } from 'src/news/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import { Role } from '../users/entities/role.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const db = await require('../../models');
      db.sequelize.addModels([News, Comment, User, Role]);
      // await db.sequelize.sync({ force: true });
      return db.sequelize;
    },
  },
];
