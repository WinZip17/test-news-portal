import { createEffect } from 'effector';
import { AxiosError } from 'axios';
import { User } from './userTypes';
import ApiFactory from '../../api/ApiFactory';

export const LoginFx = createEffect<{email: string, password: string}, User, AxiosError>(async (data) => {
  const api = new ApiFactory().userApi();
  const response = await api.login(data);
  if (response.data.access_token) {
    window.localStorage.setItem('token', response.data.access_token);
  }
  return response.data.user;
});
