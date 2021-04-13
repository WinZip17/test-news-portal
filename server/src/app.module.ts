import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

import { AppController } from './app.controller';
import { NewsModule } from './news/news.module';
import { NewsService } from './news/news.service';
import { FileModule } from './file/file.module';
import { newsProviders } from './news/news.providers';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    NewsModule,
    FileModule,
    ConfigModule.forRoot({ isGlobal: true, cache: false }),
    UsersModule,
    AuthModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: `${process.env.MAIL_MAILER}://${process.env.MAIL_USERNAME}:${process.env.MAIL_PASSWORD}@${process.env.MAIL_HOST}`,
        defaults: {
          from: 'News portal',
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [...newsProviders, NewsService],
})
export class AppModule {}