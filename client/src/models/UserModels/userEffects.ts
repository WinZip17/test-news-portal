import { createEffect } from 'effector';
import { AxiosError } from 'axios';
import {
  registrationUser,
  ResetPasswordData,
  ResponseMessage,
  SendChangePasswordData,
  updateUser,
  User,
} from './userTypes';
import ApiFactory from '../../api/ApiFactory';

export const getMeFx = createEffect<void, User, AxiosError>(async () => {
  const api = new ApiFactory().userApi();
  const responce = await api.getMe();
  return responce.data;
});

export const updateUserFx = createEffect<updateUser, User, AxiosError>(async (data) => {
  const api = new ApiFactory().userApi();
  const response = await api.updateUser(data);
  return response.data;
});

export const resetPasswordFx = createEffect<ResetPasswordData, ResponseMessage, AxiosError>(async (data) => {
  const api = new ApiFactory().userApi();
  const response = await api.resetPassword(data);
  return response.data;
});

export const registrationFx = createEffect<registrationUser, User, AxiosError>(async (data) => {
  const api = new ApiFactory().userApi();
  const response = await api.registration(data);
  return response.data;
});

export const recoveryPasswordFx = createEffect<{ email: string }, ResponseMessage, AxiosError>(async (data) => {
  const api = new ApiFactory().userApi();
  const response = await api.recoveryPassword(data);
  return response.data;
});

export const LoginFx = createEffect<{email: string, password: string}, User, AxiosError>(async (data) => {
  const api = new ApiFactory().userApi();
  const response = await api.login(data);
  if (response.data.access_token) {
    window.localStorage.setItem('token', response.data.access_token);
  }
  return response.data.user;
});

export const changePasswordFx = createEffect<SendChangePasswordData, ResponseMessage, AxiosError>(async (data) => {
  const api = new ApiFactory().userApi();
  const response = await api.changePassword(data);
  window.localStorage.removeItem('token');
  return response.data;
});
