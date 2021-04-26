import { INestApplication } from '@nestjs/common';
import AdminBro from 'admin-bro';
import * as AdminBroExpress from 'admin-bro-expressjs';
import { User } from 'src/users/entities/user.entity';
import { News } from 'src/news/entities/news.entity';
import { Comment } from 'src/news/entities/comment.entity';
const AdminBroSequelize = require('@admin-bro/sequelize');
AdminBro.registerAdapter(AdminBroSequelize);
const db = require('../../models');

export async function setupAdminPanel(app: INestApplication): Promise<void> {
  /** Create adminBro instance */
  const adminBro = new AdminBro({
    databases: [db],
    // resources: [], // Here we will put resources
    resources: [User, News, Comment],
    rootPath: '/admin',
  });

  /** Create router */
  const router = AdminBroExpress.buildRouter(adminBro);

  /** Bind routing */
  app.use(adminBro.options.rootPath, router);
}
