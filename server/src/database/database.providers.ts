import { SEQUELIZE } from 'src/constants';
import { News } from 'src/news/entities/news.entity';
import { Comment } from 'src/news/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const db = await require('../../models');
      db.sequelize.addModels([News, Comment, User]);
      // await db.sequelize.sync({ alter: true });
      return db.sequelize;
    },
  },
];
