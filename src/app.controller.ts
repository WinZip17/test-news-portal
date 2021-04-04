import { Controller, Get, Post, Render, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { NewsService } from './news/news.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly newsService: NewsService,
  ) {}

  @Post()
  create(): string {
    return 'This action adds a new news';
  }

  @Get()
  @Render('index')
  async root() {
    const news = await this.newsService.findAll();
    return { news };
  }

  @Get('add')
  @Render('add')
  async add() {
    return { addNews: this.newsService.create };
  }

  @Get('news/:id')
  @Render('news')
  async news(@Param('id') id: number) {
    const news = await this.newsService.findOne(id);
    return { news };
  }

  @Get('secret-page')
  getSecret(): string {
    return this.appService.getSecret();
  }
}
