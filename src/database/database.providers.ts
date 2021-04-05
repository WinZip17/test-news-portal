import { SEQUELIZE } from 'src/constants';
import { News } from 'src/news/entities/news.entity';
import { SequelizeTypescriptMigration } from 'sequelize-typescript-migration';
import * as path from 'path';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const db = await require('../../models/index.js');
      db.sequelize.addModels([News]);

      // await SequelizeTypescriptMigration.makeMigration(db.sequelize, {
      //   outDir: path.resolve('migrations'),
      //   migrationName: 'add-awesome-field-in-my-table',
      //   preview: false,
      // });

      return db.sequelize;
    },
  },
];
