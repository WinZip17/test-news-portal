import { createEffect } from 'effector';
import { AxiosError } from 'axios';
import ApiFactory from '../../api/ApiFactory';
import { ResetPasswordData, ResponseMessage } from './userTypes';

export const resetPasswordFx = createEffect<ResetPasswordData, ResponseMessage, AxiosError>(async (data) => {
  const api = new ApiFactory().userApi();
  const response = await api.resetPassword(data);
  return response.data;
});
