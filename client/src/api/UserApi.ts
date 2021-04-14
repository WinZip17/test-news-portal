import { AxiosInstance,AxiosPromise } from 'axios';
import {registrationUser} from "../store/models/UserModels/userTypes";

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
    return await this.axios.post(`/api/users`, data);
  }

  async registration(data: registrationUser): Promise<any> {
    return await this.axios.post(`/api/users/registration`, data);
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
