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
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService, FileType } from '../file/file.service';
import { News } from './entities/news.entity';

@Controller('api/news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private fileService: FileService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@UploadedFile() file, @Body() createNewsDto: CreateNewsDto) {
    const saveImage = await this.fileService.createFile(FileType.IMAGE, file);
    return this.newsService.create({ ...createNewsDto, image: saveImage });
  }

  @Get()
  findAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.newsService.findAll(count, offset);
  }

  @Get(':id')
  findByPk(@Param('id') id: string) {
    return this.newsService.findByPk(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(+id, updateNewsDto);
  }

  @Post('reactions')
  setReactions(
    @Body()
    reaction: {
      id: number;
      reaction: 'like' | 'dislike';
      action: 'up' | 'down';
    },
  ) {
    return this.newsService.updateReactions(reaction);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}
