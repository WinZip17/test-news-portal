import { createEffect } from 'effector';
import { AxiosError } from 'axios';
import ApiFactory from '../../api/ApiFactory';
import { ResponseMessage } from './userTypes';

export const recoveryPasswordFx = createEffect<{ email: string }, ResponseMessage, AxiosError>(async (data) => {
  const api = new ApiFactory().userApi();
  const response = await api.recoveryPassword(data);
  return response.data;
});
