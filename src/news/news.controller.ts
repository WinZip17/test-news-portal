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

@Controller('news')
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
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(+id, updateNewsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}
