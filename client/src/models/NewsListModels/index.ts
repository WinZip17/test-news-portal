import { combine, createEffect, createStore } from 'effector';
import ApiFactory from '../../api/ApiFactory';

export interface News {
  id: number;
  title: string;
  content: string;
  image: string | null;
  like: number[];
  dislike: number[];
}

interface NewsResponse {
  news: News[],
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

// переменная стора
export const $newsList = createStore<NewsResponse>({
  news: [],
  page: 1,
  lastPage: 1,
});

$newsList.on(getNewsListFx.doneData, updateStore);

export const $fetchErrorNewsList = createStore<Error | null>(null);
$fetchErrorNewsList
  .on(getNewsListFx.fail, (_, { error }) => error)
  .reset(getNewsListFx.done);

export const $newsListGetStatus = combine({
  loading: getNewsListFx.pending,
  error: $fetchErrorNewsList,
  data: $newsList,
});
