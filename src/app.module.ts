import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

import { AppController } from './app.controller';
import { NewsModule } from './news/news.module';
import { NewsService } from './news/news.service';
import { FileModule } from './file/file.module';
import { newsProviders } from './news/news.providers';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    NewsModule,
    FileModule,
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
  ],
  controllers: [AppController],
  // TODO: вопрос. Почему NewsService начали работать когда продублировал newsProviders сюда, которые добавлены в NewsService
  providers: [...newsProviders, NewsService],
})
export class AppModule {}
