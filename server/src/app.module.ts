import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
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
import { FrontendMiddleware } from './frontend.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    NewsModule,
    FileModule,
    // ConfigModule.forRoot({ isGlobal: true, cache: false }),
    UsersModule,
    AuthModule,
    MailerModule.forRootAsync({
      useFactory: function () {
        const transport = `${process.env.MAIL_MAILER}://${process.env.MAIL_USERNAME}:${process.env.MAIL_PASSWORD}@${process.env.MAIL_HOST}`;
        return {
          transport,
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
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [...newsProviders, NewsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(FrontendMiddleware).forRoutes({
      path: '/**',
      method: RequestMethod.ALL,
    });
  }
}
