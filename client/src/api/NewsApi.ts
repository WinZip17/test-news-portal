import { AxiosInstance } from 'axios';
import { BASE_URL } from "../constant";

export interface NewsApi {
  getNewsList(): Promise<any>;
  getNews(id: number): Promise<any>;
}

export class NewsApiImpl implements NewsApi {
  constructor(private axios: AxiosInstance) {
    this.axios = axios;
  }

  async getNewsList(): Promise<any> {
    const result = await this.axios.get(`${BASE_URL}/api/news`);
    return result;
  }

  async getNews(id: number): Promise<any> {
    const result = await this.axios.get(`${BASE_URL}/api/news/${id}`);
    return result;
  }

}