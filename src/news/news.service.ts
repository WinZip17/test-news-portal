import { Injectable, Inject } from '@nestjs/common';
import { NEWS_REPOSITORY } from 'src/constants';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';

@Injectable()
export class NewsService {
  constructor(@Inject(NEWS_REPOSITORY) private newsRepository: typeof News) {}

  async create(createNewsDto: CreateNewsDto) {
    const newNews = await this.newsRepository.create(createNewsDto);
    return newNews.id;
  }

  async findAll(count = 10, offset = 0): Promise<News[]> {
    return this.newsRepository.findAll<News>({ offset, limit: count });
  }

  async findByPk(id: number): Promise<News> {
    const findNews = await this.newsRepository.findByPk(id);
    return findNews;
  }

  async update(id: number, updateNewsDto: UpdateNewsDto): Promise<string> {
    await this.newsRepository.update(updateNewsDto, { where: { id } });
    return `новость с ид ${id} обновлена`;
  }

  async updateReactions(data): Promise<News> {
    const { id, reaction } = data;

    const news: News = await this.findByPk(id);
    news.like = 10
    console.log('newssss', news.like)

    // await this.newsRepository.update(news, { where: { id } });
    return news;
  }

  async remove(id: number): Promise<string> {
    await this.newsRepository.destroy({ where: { id } });
    return `новость с ид ${id} удалена`;
  }
}
