import { INestApplication } from '@nestjs/common';
import AdminBro from 'admin-bro';
import bcrypt from 'bcrypt';
import AdminBroSequelize from '@admin-bro/sequelize';
import * as AdminBroExpress from 'admin-bro-expressjs';
import { User } from 'src/users/entities/user.entity';
import { News } from 'src/news/entities/news.entity';
import { Comment } from 'src/news/entities/comment.entity';

AdminBro.registerAdapter(AdminBroSequelize);
const db = require('../../models');

const baseNavigation = {
  name: 'База данных',
  icon: 'Accessibility',
};

const {
  after: uploadAfterHook,
  before: uploadBeforeHook,
} = require('./actions/upload-image.hook');

export async function setupAdminPanel(app: INestApplication): Promise<void> {
  /** Create adminBro instance */
  const adminBro = new AdminBro({
    databases: [db],
    // resources: [], // Here we will put resources
    resources: [
      { resource: User, options: { navigation: baseNavigation } },
      {
        resource: News,
        options: {
          navigation: baseNavigation,
          properties: {
            content: { type: 'richtext' },
            uploadImage: {
              components: {
                edit: AdminBro.bundle('./components/upload-image.edit.tsx'),
              },
            },
          },
          action: {
            new: {
              after: async (response, request, context) => {
                const modifiedResponse = await uploadAfterHook(
                  response,
                  request,
                  context,
                );
                return modifiedResponse;
              },
              before: async (response, request, context) => {
                const modifiedResponse = await uploadBeforeHook(
                  response,
                  request,
                  context,
                );
                return modifiedResponse;
              },
            },
            edit: {
              after: async (response, request, context) => {
                const modifiedResponse = await uploadAfterHook(
                  response,
                  request,
                  context,
                );
                return modifiedResponse;
              },
              before: async (response, request, context) => {
                const modifiedResponse = await uploadBeforeHook(
                  response,
                  request,
                  context,
                );
                return modifiedResponse;
              },
            },
          },
        },
      },
      { resource: Comment, options: { navigation: baseNavigation } },
    ],
    rootPath: '/admin',
  });
  console.log('adminBro', adminBro);
  /** Create router */
  const router = AdminBroExpress.buildRouter(adminBro);

  /** Роутинг с авторизацией  */
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
