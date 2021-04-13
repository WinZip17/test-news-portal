import {
  Controller,
  Get,
  Post,
  Render,
  Param,
  Res,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { NewsService } from './news/news.service';
import { Response } from 'express';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/ jwt-auth.guard';
import { LoginUserDto } from './users/dto/login-user.dto';

@Controller()
export class AppController {
  constructor(
    private readonly newsService: NewsService,
    private authService: AuthService,
  ) {}

  @Post('auth/login')
  async login(@Body() data: LoginUserDto) {
    return this.authService.login(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get()
  async root(@Res() res: Response) {
    const news = await this.newsService.findAll();
    const userAgent = res.req.headers['user-agent'];
    const MobileDetect = await require('mobile-detect');
    const deviceInfo = new MobileDetect(userAgent);
    if (!deviceInfo.mobile()) {
      return res.render('index.pug', { news });
    } else {
      return res.render('mobile.pug', { news });
    }
  }

  @Get('add')
  @Render('add')
  async add() {
    return { addNews: this.newsService.create };
  }

  @Get('news/:id')
  @Render('news')
  async news(@Param('id') id: number) {
    const news = await this.newsService.findByPk(id);
    return { news };
  }
}
