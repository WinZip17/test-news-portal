import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { setupAdminPanel } from './admin-panel/admin-panel.plugin';
import { ValidationPipe } from '@nestjs/common';

const start = async () => {
  try {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('pug');
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());

    await setupAdminPanel(app);

    await app.listen(PORT, () =>
      console.log(`server started http://localhost:${PORT}`),
    );
  } catch (e) {
    console.log('error', e);
  }
};

start();
