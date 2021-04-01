import { Injectable, Inject } from '@nestjs/common';
import { NEWS_REPOSITORY } from 'src/constants';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';

@Injectable()
export class NewsService {
  constructor(
    @Inject(NEWS_REPOSITORY) private newsRepository: typeof News) {}

  async create(createNewsDto: CreateNewsDto) {
    const newNews = await this.newsRepository.create(createNewsDto)
    return newNews;
  }

  async findAll(): Promise<News[]> {
    return this.newsRepository.findAll<News>();
  }

  async findOne(id: number): Promise<News> {
    const findNews = await this.newsRepository.findByPk(id)
    return findNews;
  }

  async update(id: number, updateNewsDto: UpdateNewsDto): Promise<string> {
    const updateNews = await this.newsRepository.update(updateNewsDto, { where: { id } } )
    return `новость с ид ${id} обновлена`;
  }

  async remove(id: number): Promise<string> {
    const delNews = await this.newsRepository.destroy({ where: { id } })
    return `новость с ид ${id} удалена`;
  }
}
