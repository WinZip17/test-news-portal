import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import {setupAdminPanel} from './admin-panel/admin-panel.plugin';

const start = async () => {
  try {
    const PORT = process.env.PORT || 3000
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('pug');
    app.enableCors();

    /**
     * Setup Admin panel
     */
    await setupAdminPanel(app);

    await app.listen(3000, () => console.log(`server started http://localhost:${PORT}`));
  } catch (e) {
    console.log('error', e)
  }
}

start();
