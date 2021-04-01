import {Controller, Get, Req, Post, Header, Render} from '@nestjs/common';
import { AppService } from './app.service';
import { NewsService } from './news/news.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Header('Access-Control-Allow-Origin', '*')

  @Post()
  create(): string {
    return 'This action adds a new news';
  }

  @Get()
  @Render('index')
  root() {
    return { message: 'stop this bla' }
  }


  @Get('secret-page')
  getSecret(): string {
    return this.appService.getSecret();
  }
}
