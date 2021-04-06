import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize/types';
import { SEQUELIZE } from 'src/constants';
import { News } from 'src/news/entities/news.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: process.env.DATABASE_DIALECT as Dialect || 'postgres',
        host:  process.env.DATABASE_HOST || 'localhost',
        port: Number(process.env.DATABASE_PORT) || 5432,
        username: process.env.DATABASE_USER || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'postgres',
        database: process.env.DATABASE_NAME || 'news_db',
      });
      sequelize.addModels([News]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
