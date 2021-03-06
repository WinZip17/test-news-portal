import { createEffect } from 'effector';
import { AxiosError } from 'axios';
import ApiFactory from '../../api/ApiFactory';
import { CommentType } from './newsTypes';

export const addCommentFx = createEffect<CommentType, any, AxiosError>(async (data) => {
  const api = new ApiFactory().newsApi();
  const response = await api.addComment(data);
  return response.data;
});

export const removeCommentFx = createEffect<number, any, AxiosError>(async (id: number) => {
  const api = new ApiFactory().newsApi();
  const response = await api.removeComment(id);
  return response.data;
});
