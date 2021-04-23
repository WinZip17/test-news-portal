import { createEffect } from 'effector';
import { AxiosError } from 'axios';
import ApiFactory from '../../api/ApiFactory';

export const changePasswordFx = createEffect<{password: string, newPassword: string}, {statusCode: string, message: string}, AxiosError>(async (data) => {
  const api = new ApiFactory().userApi();
  const response = await api.changePassword(data);
  window.localStorage.removeItem('token');
  return response.data;
});
