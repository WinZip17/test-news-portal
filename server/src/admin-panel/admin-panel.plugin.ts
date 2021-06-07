import { INestApplication } from '@nestjs/common';
import AdminBro from 'admin-bro';
import AdminBroSequelize from '@admin-bro/sequelize';
import * as AdminBroExpress from 'admin-bro-expressjs';
import UserResources from './resources/user.resources';
import NewsResources from './resources/news.resources';
import CommentResources from './resources/comment.resources';
import RoleResources from './resources/role.resources';
AdminBro.registerAdapter(AdminBroSequelize);

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
  // const router = AdminBroExpress.buildRouter(adminBro);

  /** Роутинг с авторизацией  */
  const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
      console.log('router1');
      const AuthUser = db.sequelize.models.User.scope('full');
      console.log('router2');

      const user = await AuthUser.scope('full').findOne({
        where: {
          email,
        },
      });
      console.log('router3');

      if (user) {
        const matched = await bcrypt.compare(password, user.password);
        if (matched) {
          if (user.RoleId === 1) {
            return user;
          }
          // return user;
        }
      }
      return null;
    },
    cookieName: 'adminbro',
    cookiePassword: 'some-secret-password-used-to-secure-cookie',
  });

  /** Bind routing */
  app.use(adminBro.options.rootPath, router);
}
