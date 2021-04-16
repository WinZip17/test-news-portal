import ApiFactory from '../../api/ApiFactory';
import {combine, createEffect, createStore} from "effector";
import {News} from "../NewsListModels";
import {AxiosError} from "axios";

export const getNewsFx = createEffect<{id: number}, News, AxiosError>(async (params) => {
  const { id } = params
  const api = new ApiFactory().newsApi();
  const responce = await api.getNews(id);
  return responce.data
});

export const $news = createStore<News | null>(null)

$news.on(getNewsFx.doneData, (state, news) => news )


export const $fetchErrorNews = createStore<AxiosError | null>(null);
$fetchErrorNews
  .on(getNewsFx.fail, (_, { error }: {error: AxiosError}) => error.response?.data.message)
  .reset(getNewsFx.done);


export const $newsGetStatus = combine({
  loading: getNewsFx.pending,
  error: $fetchErrorNews,
  news: $news,
});
