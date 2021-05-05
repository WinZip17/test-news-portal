import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { setupAdminPanel } from './admin-panel/admin-panel.plugin';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UsersModule } from './users/users.module';
import { NewsModule } from './news/news.module';

const start = async () => {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    console.log('process.env.PORT2222', process.env.PORT);
    const PORT = process.env.PORT || 3001;
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('pug');
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    await setupAdminPanel(app);

    const swaggerConfig = new DocumentBuilder()
      .setTitle('News example')
      .setDescription('The news API description')
      .setVersion('1.0')
      .addTag('News', 'Новости')
      .addTag('Users', 'Пользователи')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig, {
      include: [UsersModule, NewsModule],
    });
    SwaggerModule.setup('api', app, document);

    await app.listen(PORT, () =>
      console.log(`server started http://localhost:${PORT}`),
    );
  } catch (e) {
    console.log('error', e);
  }
};

start();
