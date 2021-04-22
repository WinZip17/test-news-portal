import { createEffect } from 'effector';
import { AxiosError } from 'axios';
import { updateUser, User } from './userTypes';
import ApiFactory from '../../api/ApiFactory';

export const updateUserFx = createEffect<updateUser, User, AxiosError>(async (data) => {
  const api = new ApiFactory().userApi();
  const response = await api.updateUser(data);
  return response.data;
});
