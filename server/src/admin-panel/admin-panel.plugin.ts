import { INestApplication } from '@nestjs/common';
import AdminBro from 'admin-bro';
import * as AdminBroExpress from 'admin-bro-expressjs';
import { User } from 'src/users/entities/user.entity';
import { News } from 'src/news/entities/news.entity';
import { Comment } from 'src/news/entities/comment.entity';
const AdminBroSequelize = require('@admin-bro/sequelize');
AdminBro.registerAdapter(AdminBroSequelize);
const db = require('../../models');

const uploadFeature = require('@admin-bro/upload');
const bcrypt = require('bcrypt');

const baseNavigation = {
  name: 'База данных',
  icon: 'Accessibility',
};

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
            image: {
              components: {
                edit: AdminBro.bundle('./components/Image'),
              },
            },
          },
          features: [
            uploadFeature({
              provider: {
                aws: {
                  bucket: 'config.s3.bucket',
                  accessKeyId: 'config.s3.accessKeyId',
                  secretAccessKey: 'config.s3.secretAccessKey',
                  region: 'config.s3.region',
                },
              },
              properties: {
                key: 'path',
                filePath: 'imagePaths',
              },
              validation: {
                mimeTypes: ['image/png', 'image/jpg', 'image/jpeg'],
              },
              multiple: true,
            }),
          ],
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
