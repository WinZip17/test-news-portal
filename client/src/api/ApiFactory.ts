import Axios from 'axios';
import { NewsApi, NewsApiImpl } from './NewsApi';
import { UserApi, UserApiImpl } from './UserApi';

class ApiFactory {
  private readonly axios;

  constructor() {
    this.axios = Axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
    });
    this.getInterceptors();
  }

  newsApi(): NewsApi {
    return new NewsApiImpl(this.axios);
  }

  userApi(): UserApi {
    return new UserApiImpl(this.axios);
  }

  getInterceptors = () => {
    this.axios.interceptors.response.use(undefined, (error) => {
      if (error && error.response && error.response.status === 401) {
        if (window.localStorage.getItem('token')) {
          window.localStorage.removeItem('token');
        }
      }
      return Promise.reject(error);
    });
  };
}

export default ApiFactory;
