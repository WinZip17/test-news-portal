import { Injectable, Inject } from '@nestjs/common';
import { COMMENTS_REPOSITORY, NEWS_REPOSITORY } from 'src/constants';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';
import { Comment } from './entities/comment.entity';

@Injectable()
export class NewsService {
  constructor(
    @Inject(NEWS_REPOSITORY) private newsRepository: typeof News,
    @Inject(COMMENTS_REPOSITORY) private commentRepository: typeof Comment,
  ) {}

  async create(createNewsDto: CreateNewsDto) {
    const newNews = await this.newsRepository.create(createNewsDto);
    return newNews.id;
  }

  async findAll(count = 10, offset = 0): Promise<News[]> {
    return this.newsRepository.findAll<News>({
      offset,
      limit: count,
      include: [Comment],
    });
  }

  async findByPk(id: number): Promise<News> {
    const findNews = await this.newsRepository.findByPk(id);
    return findNews;
  }

  async update(id: number, updateNewsDto: UpdateNewsDto): Promise<string> {
    await this.newsRepository.update(updateNewsDto, { where: { id } });
    return `новость с ид ${id} обновлена`;
  }

  async updateReactions(data): Promise<{ [key: string]: number }> {
    const { id, reactions, action } = data;
    const news: News = await this.findByPk(id);
    let result = news[reactions] || 0;
    if (action === 'down') {
      if (result > 1) {
        result -= 1;
      } else {
        result = 0;
      }
    } else {
      result += 1;
    }
    news[reactions] = result;
    await news.save();

    return { [reactions]: result };
  }

  async remove(id: number): Promise<string> {
    await this.newsRepository.destroy({ where: { id } });
    return `новость с ид ${id} удалена`;
  }

  async createComment(data): Promise<Comment> {
    const { id, content } = data;
    const newComment = await this.commentRepository.create({
      content,
      NewsId: id,
    });
    return newComment;
  }
}
