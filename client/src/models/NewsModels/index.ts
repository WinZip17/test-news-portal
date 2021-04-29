import { combine, createEffect, createStore } from 'effector';
import { AxiosError } from 'axios';
import ApiFactory from '../../api/ApiFactory';
import { News } from '../NewsListModels';
import { addNewsFx } from './newsAdd';
import { reactionsOneNewsFx } from '../NewsListModels/newsReactions';
import { addCommentFx } from './commentAdd';

export const getNewsFx = createEffect<{id: number}, News, AxiosError>(async (params) => {
  const { id } = params;
  const api = new ApiFactory().newsApi();
  const responce = await api.getNews(id);
  return responce.data;
});

export const $news = createStore<News | null>(null);

$news
  .on(getNewsFx.doneData, (state, news) => news)
  .on(reactionsOneNewsFx.doneData, (state, news) => news)
  .on(addCommentFx.doneData, (state, news) => news);

export const $fetchErrorNews = createStore<AxiosError | null>(null);
$fetchErrorNews
  .on(getNewsFx.fail, (_, { error }: {error: AxiosError}) => error.response?.data.message)
  .reset(getNewsFx.done);

export const $newsGetStatus = combine({
  loading: getNewsFx.pending,
  loadingReactions: reactionsOneNewsFx.pending,
  loadingAddNews: addNewsFx.pending,
  loadingAddComment: addCommentFx.pending,
  error: $fetchErrorNews,
  news: $news,
});
