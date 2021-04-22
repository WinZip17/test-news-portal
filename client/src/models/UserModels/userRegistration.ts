import { createEffect } from 'effector';
import { AxiosError } from 'axios';
import { registrationUser, User } from './userTypes';
import ApiFactory from '../../api/ApiFactory';

export const registrationFx = createEffect<registrationUser, User, AxiosError>(async (data) => {
  const api = new ApiFactory().userApi();
  const response = await api.registration(data);
  return response.data;
});
