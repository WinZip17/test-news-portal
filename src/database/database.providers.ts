import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE } from 'src/constants';
import { News } from 'src/news/entities/news.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'news_db',
      });
      sequelize.addModels([News]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
