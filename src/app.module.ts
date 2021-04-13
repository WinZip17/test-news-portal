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
  ],
  controllers: [AppController],
  providers: [...newsProviders, NewsService],
})
export class AppModule {}
