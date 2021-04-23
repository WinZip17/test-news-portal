import { createEffect } from 'effector';
import { AxiosError } from 'axios';
import ApiFactory from '../../api/ApiFactory';
import { AddNewsTypes } from './newsTypes';

export const addNewsFx = createEffect<AddNewsTypes, any, AxiosError>(async (data) => {
  const api = new ApiFactory().newsApi();
  const response = await api.addNews(data);
  return response.data;
});
