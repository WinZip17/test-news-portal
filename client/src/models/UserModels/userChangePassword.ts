import { createEffect } from 'effector';
import { AxiosError } from 'axios';
import ApiFactory from '../../api/ApiFactory';
import { ResponseMessage, SendChangePasswordData } from './userTypes';

export const changePasswordFx = createEffect<SendChangePasswordData, ResponseMessage, AxiosError>(async (data) => {
  const api = new ApiFactory().userApi();
  const response = await api.changePassword(data);
  window.localStorage.removeItem('token');
  return response.data;
});
