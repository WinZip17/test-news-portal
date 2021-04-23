import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/ jwt-auth.guard';

@Controller('api/news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@UploadedFile() file, @Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create({ ...createNewsDto }, file);
  }

  @Get()
  findAll(@Query('page') page: string, @Query('offset') size: string) {
    return this.newsService.findAll(page, size);
  }

  @Get(':id')
  findByPk(@Param('id') id: string) {
    return this.newsService.findByPk(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(+id, updateNewsDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('reactions')
  setReactions(
    @Body()
    reactions: {
      id: number;
      reaction: 'like' | 'dislike';
    },
    @Request() req,
  ) {
    return this.newsService.updateReactions({
      ...reactions,
      userId: req.user.id,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }

  @Post('comment')
  async createComment(@Body() data: CreateCommentDto) {
    return this.newsService.createComment(data);
  }
}
