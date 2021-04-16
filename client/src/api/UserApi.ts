import { AxiosInstance,AxiosPromise } from 'axios';
import {registrationUser} from "../models/UserModels/userTypes";

export interface UserApi {
  getMe(): AxiosPromise<any>;
  login(data: {email: string, password: string}): AxiosPromise<any>;
  registration(data: registrationUser): AxiosPromise<any>;
  changePassword(data: {password: string, newPassword: string}): AxiosPromise<any>;
  recoveryPassword(data: {email: string}): AxiosPromise<any>;
  resetPassword(data: {email: string, password: string, code: string}): AxiosPromise<any>;
  updateUser(data: {name: string}): AxiosPromise<any>;
}

export class UserApiImpl implements UserApi {
  constructor(private axios: AxiosInstance) {
    this.axios = axios;
  }

  async getMe(): Promise<any> {
    return await this.axios.get(`/me`);
  }

  async login(data: {email: string, password: string}): Promise<any> {
    return await this.axios.post(`/auth/login`, data);
  }

  async registration(data: registrationUser): Promise<any> {
    const formData = new FormData();
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('password', data.password)
    if (data.avatar && data.avatar.length > 0) {
      formData.append('avatar', data.avatar[0])
    }
    return await this.axios.post(`/api/users/registration`, formData);
  }

  async changePassword(data: {password: string, newPassword: string}): Promise<any> {
    return await this.axios.post(`/api/users/change-password`, data);
  }

  async recoveryPassword(data: {email: string}): Promise<any> {
    return await this.axios.post(`/api/users/recovery-password`, data);
  }

  async resetPassword(data: {email: string, password: string, code: string}): Promise<any> {
    return await this.axios.post(`/api/users/reset-password`, data);
  }

  async updateUser(data: {name: string}): Promise<any> {
    return await this.axios.patch(`/api/users`, data);
  }

}
