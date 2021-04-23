import { combine, createEffect, createStore } from 'effector';
import ApiFactory from '../../api/ApiFactory';
import { CommentType } from '../NewsModels/newsTypes';
import { reactionsNewsFx } from './newsReactions';

export interface News {
  id: number;
  title: string;
  content: string;
  image: string | null;
  like: number[];
  dislike: number[];
  comments: CommentType[]
}

export interface NewsListItem extends News {
  commentCount: string
}

interface NewsResponse {
  news: NewsListItem[],
  page: number,
  lastPage: number
}

// Создаем эффект, который делает GET-запрос на бек
export const getNewsListFx = createEffect<number, NewsResponse, Error>(async (page = 1) => {
  const api = new ApiFactory().newsApi();
  const responce = await api.getNewsList(page);
  return responce.data;
});

// Обычный хендлер на обновление. Добавляем или изменяем новости (аналог редюсера)
const updateStore = (state: NewsResponse, data: NewsResponse) => {
  if (data.page === 1) {
    return data;
  }
  if (state.page !== data.page) {
    return { news: [...state.news, ...data.news], page: data.page, lastPage: data.lastPage };
  }
  return state;
};
// Обычный хендлер на обновление. Добавляем или изменяем новости (аналог редюсера)
const updateReactions = (state: NewsResponse, data: News) => {
  const newsList = state.news;
  const newsIndex = newsList.findIndex(((obj) => obj.id === data.id));
  newsList[newsIndex].like = data.like;
  newsList[newsIndex].dislike = data.dislike;
  return { ...state, news: newsList };
};

// переменная стора
export const $newsList = createStore<NewsResponse>({
  news: [],
  page: 1,
  lastPage: 1,
});

$newsList
  .on(getNewsListFx.doneData, updateStore)
  .on(reactionsNewsFx.doneData, updateReactions);

export const $fetchErrorNewsList = createStore<Error | null>(null);
$fetchErrorNewsList
  .on(getNewsListFx.fail, (_, { error }) => error)
  .reset(getNewsListFx.done);

export const $newsListGetStatus = combine({
  loading: getNewsListFx.pending,
  reactionLoading: reactionsNewsFx.pending,
  error: $fetchErrorNewsList,
  data: $newsList,
});
