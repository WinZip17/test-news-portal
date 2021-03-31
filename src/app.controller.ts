import {Controller, Get, Req, Post, Header} from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Header('Access-Control-Allow-Origin', '*')

  @Post()
  create(): string {
    return 'This action adds a new news';
  }

  @Get()
  getHello(@Req() request: Request): string {
    console.log('body', request.body)
    console.log('params', request.params)
    console.log('query', request.query)
    console.log('headers', request.headers)
    console.log('ip', request.ip)
    return this.appService.getHello();
  }

  @Get('secret-page')
  getSecret(): string {
    return this.appService.getSecret();
  }
}
