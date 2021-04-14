import { AxiosInstance,AxiosPromise } from 'axios';
import { BASE_URL } from "../constant";

export interface UserApi {
  getMe(): AxiosPromise<any>;
}

export class UserApiImpl implements UserApi {
  constructor(private axios: AxiosInstance) {
    this.axios = axios;
  }

  async getMe(): Promise<any> {
    const result = await this.axios.get(`${BASE_URL}/me`);
    return result;
  }

}
