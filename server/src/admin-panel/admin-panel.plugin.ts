import { INestApplication } from '@nestjs/common';
import AdminBro from 'admin-bro';
import * as AdminBroExpress from 'admin-bro-expressjs';
const AdminBroSequelize = require('@admin-bro/sequelize');
AdminBro.registerAdapter(AdminBroSequelize);
const db = require('../../models');

const Users = db.sequelize;

console.log('Users', Users);

export async function setupAdminPanel(app: INestApplication): Promise<void> {
  /** Create adminBro instance */
  const adminBro = new AdminBro({
    databases: [db],
    resources: [], // Here we will put resources
    rootPath: '/admin', // Define path for the admin panel
  });

  /** Create router */
  const router = AdminBroExpress.buildRouter(adminBro);

  /** Bind routing */
  app.use(adminBro.options.rootPath, router);
}
