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

export const baseNavigation = {
  name: 'База данных',
  icon: 'Accessibility',
};

export async function setupAdminPanel(app: INestApplication): Promise<void> {
  const adminBro = new AdminBro({
    databases: [db],
    resources: [
      UserResources(db),
      NewsResources(),
      CommentResources(),
      RoleResources(),
    ],
    rootPath: '/admin',
    branding: {
      companyName: 'админОчко',
    },
  });
  /** Роутинг без авторизации  */
  const router = AdminBroExpress.buildRouter(adminBro);

  /** Роутинг с авторизацией, и жестокой проверкой на емаил вместо прав :)  */
  // const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  //   authenticate: async (email, password) => {
  //     const AuthUser = db.sequelize.models.User;
  //     const user = await AuthUser.scope('full').findOne({
  //       where: {
  //         email,
  //       },
  //     });
  //     if (user) {
  //       const matched = await bcrypt.compare(password, user.password);
  //       if (matched) {
  //         if (user.email === 'wydo17@ya.ru') {
  //           return true;
  //         }
  //         // return user;
  //       }
  //     }
  //     return false;
  //   },
  //   cookiePassword: 'some-secret-password-used-to-secure-cookie',
  // });

  /** Bind routing */
  app.use(adminBro.options.rootPath, router);
}
