import { AxiosInstance } from 'axios';
import { AddNewsTypes } from '../models/NewsModels/newsTypes';

export interface NewsApi {
  getNewsList(page?: number, size?: number): Promise<any>;
  getNews(id: number): Promise<any>;
  addNews(data: AddNewsTypes): Promise<any>;
}

export class NewsApiImpl implements NewsApi {
  constructor(private axios: AxiosInstance) {
    this.axios = axios;
  }

  async getNewsList(page = 1, size = 5): Promise<any> {
    const result = await this.axios.get('/api/news', { params: { page, size } });
    return result;
  }

  async getNews(id: number): Promise<any> {
    const result = await this.axios.get(`/api/news/${id}`);
    return result;
  }

  async addNews(data: AddNewsTypes): Promise<any> {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0]);
    }
    const result = await this.axios.post('/api/news', formData);
    return result;
  }
}
