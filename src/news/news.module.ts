import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import {newsProviders} from "./news.providers";
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NewsController],
  providers: [NewsService, ...newsProviders]
})
export class NewsModule {}
