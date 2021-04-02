import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { NewsService } from "./news/news.service";
import { FileModule } from "./file/file.module";
import { newsProviders } from './news/news.providers';

@Module({
  imports: [NewsModule, FileModule],
  controllers: [AppController],
  // TODO: вопрос. Почему NewsService начали работать когда продублировал newsProviders сюда, которые добавлены в NewsService
  providers: [AppService, ...newsProviders, NewsService],
})
export class AppModule {}
