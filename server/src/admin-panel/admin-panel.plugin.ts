import { INestApplication } from '@nestjs/common';
import AdminBro from 'admin-bro';
import AdminBroSequelize from '@admin-bro/sequelize';
import UserResources from './resources/user.resources';
import NewsResources from './resources/news.resources';
import CommentResources from './resources/comment.resources';
import RoleResources from './resources/role.resources';
AdminBro.registerAdapter(AdminBroSequelize);

const AdminBroExpressjs = require('@admin-bro/express');
const db = require('../../models');
const bcrypt = require('bcrypt');

export const baseNavigation = {
  name: 'База данных',
  icon: 'Accessibility',
};

export async function setupAdminPanel(app: INestApplication): Promise<void> {
  const adminBro = new AdminBro({
    databases: [db],
    resources: [
      UserResources(db),
      NewsResources(db),
      CommentResources(db),
      RoleResources(db),
    ],
    rootPath: '/admin',
    branding: {
      companyName: 'админОчко',
    },
  });
  /** Роутинг без авторизации  */
  // const router = AdminBroExpressjs.buildRouter(adminBro);

  /** Роутинг с авторизацией  */
  const router = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
      const user = await db.sequelize.models.User.scope('full').findOne({
        where: {
          email,
        },
      });
      if (user) {
        const matched = await bcrypt.compare(password, user.password);
        if (matched) {
          if (user.RoleId === 2) {
            return true;
          }
        }
      }
      return false;
    },
    cookiePassword: 'some-secret2-password-used-to-secure-cookie',
  });

  /** Bind routing */
  app.use(adminBro.options.rootPath, router);
}
