import {AxiosError } from 'axios';
import {combine, createStore} from 'effector';
import {$news, getNewsFx} from './index';

export const $fetchErrorNews = createStore<AxiosError | null>(null);
$fetchErrorNews
  .on(getNewsFx.fail, (_, { error }: {error: AxiosError}) => error.response?.data.message)
  .reset(getNewsFx.done);


export const $newsGetStatus = combine({
  loading: getNewsFx.pending,
  error: $fetchErrorNews,
  news: $news,
});
