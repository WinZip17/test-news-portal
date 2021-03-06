import { AxiosInstance, AxiosPromise } from 'axios';
import { registrationUser, ResetPasswordData, updateUser } from '../models/UserModels/userTypes';

export interface UserApi {
  getMe(): AxiosPromise<any>;
  login(data: {email: string, password: string}): AxiosPromise<any>;
  registration(data: registrationUser): AxiosPromise<any>;
  changePassword(data: {password: string, newPassword: string}): AxiosPromise<any>;
  recoveryPassword(data: {email: string}): AxiosPromise<any>;
  resetPassword(data: ResetPasswordData): AxiosPromise<any>;
  updateUser(data: updateUser): AxiosPromise<any>;
}

export class UserApiImpl implements UserApi {
  constructor(private axios: AxiosInstance) {
    this.axios = axios;
  }

  async getMe(): Promise<any> {
    const result = await this.axios.get('/api/users/me');
    return result;
  }

  async login(data: {email: string, password: string}): Promise<any> {
    const result = await this.axios.post('/api/users/login', data);
    return result;
  }

  async registration(data: registrationUser): Promise<any> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    if (data.avatar && data.avatar.length > 0) {
      formData.append('avatar', data.avatar[0]);
    }
    const result = await this.axios.post('/api/users/registration', formData);
    return result;
  }

  async changePassword(data: {password: string, newPassword: string}): Promise<any> {
    const result = await this.axios.post('/api/users/change-password', data);
    return result;
  }

  async recoveryPassword(data: {email: string}): Promise<any> {
    const result = await this.axios.post('/api/users/recovery-password', data);
    return result;
  }

  async resetPassword(data: ResetPasswordData): Promise<any> {
    const result = await this.axios.post('/api/users/reset-password', data);
    return result;
  }

  async updateUser(data: updateUser): Promise<any> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('password', data.password);
    if (data.avatar && data.avatar.length > 0) {
      formData.append('avatar', data.avatar[0]);
    }
    const result = await this.axios.patch('/api/users', formData);
    return result;
  }
}
