import { createEffect } from 'effector';
import { AxiosError } from 'axios';
import ApiFactory from '../../api/ApiFactory';
import { ReactionNewsTypes } from '../NewsModels/newsTypes';

export const reactionsNewsFx = createEffect<ReactionNewsTypes, any, AxiosError>(async (data) => {
  const api = new ApiFactory().newsApi();
  const response = await api.setReaction(data);
  return response.data;
});

export const reactionsOneNewsFx = createEffect<ReactionNewsTypes, any, AxiosError>(async (data) => {
  const api = new ApiFactory().newsApi();
  const response = await api.setReaction(data);
  return response.data;
});
