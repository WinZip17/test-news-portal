import {Injectable, Inject, HttpException, HttpStatus} from '@nestjs/common';
import {
  COMMENTS_REPOSITORY,
  FILE_SERVICE,
  NEWS_REPOSITORY,
} from 'src/constants';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';
import { Comment } from './entities/comment.entity';
import { FileService, FileType } from '../file/file.service';

@Injectable()
export class NewsService {
  constructor(
    @Inject(NEWS_REPOSITORY) private newsRepository: typeof News,
    @Inject(COMMENTS_REPOSITORY) private commentRepository: typeof Comment,
    @Inject(FILE_SERVICE) private fileService: FileService,
  ) {}

  async create(createNewsDto: CreateNewsDto, file) {
    const saveImage = await this.fileService.createFile(FileType.IMAGE, file);
    const newNews = await this.newsRepository.create({
      ...createNewsDto,
      image: saveImage,
    });
    return newNews.id;
  }

  async findAll(count = 10, offset = 0): Promise<News[]> {
    return this.newsRepository.findAll<News>({
      offset,
      limit: count,
      include: {
        model: Comment,
        attributes: ['content'],
      },
    });
  }

  async findByPk(id: number): Promise<News> {
    const findNews = await this.newsRepository.findByPk(id, {
      include: [Comment],
    });
    if (!findNews) {
      throw new HttpException(
        'Запрашиваемая новость не найдена :(',
        HttpStatus.NOT_FOUND,
      );
    }
    return findNews;
  }

  async update(id: number, updateNewsDto: UpdateNewsDto): Promise<string> {
    await this.newsRepository.update(updateNewsDto, { where: { id } });
    return `новость с ид ${id} обновлена`;
  }

  async updateReactions(data): Promise<News> {
    const { id, userId, reactions } = data;
    const news: News = await this.findByPk(id);
    if (news.like.includes(userId) || news.dislike.includes(userId)) {
      news.like = news.like.filter((id) => id !== userId);
      news.dislike = news.dislike.filter((id) => id !== userId);
    } else {
      news[reactions] = [...news[reactions], userId];
    }
    await news.save();
    return news;
  }

  async remove(id: number): Promise<string> {
    const news: News = await this.findByPk(id);
    let delImage = '';
    if (news.image) {
      delImage = await this.fileService.removeFile(news.image);
    }
    await this.newsRepository.destroy({ where: { id } });
    return `новость с ид ${id} удалена, ${delImage}`;
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
