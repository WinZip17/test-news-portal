import {combine, createEffect, createStore} from "effector";
import ApiFactory from "../../api/ApiFactory";

export interface News {
  id: number;
  title: string;
  content: string;
  image: string | null;
  like: number[];
  dislike: number[];
}


// Создаем эффект, который делает GET-запрос на бек
export const getNewsListFx = createEffect<void, News[], Error>(async () => {
  const api = new ApiFactory().newsApi();
  const responce = await api.getNewsList();
  return responce.data
});

// Обычный хендлер на обновление. Добавляем или изменяем новости (аналог редюсера)
const updateStore = (state: News[], data: News[]) => {
  return data;
};

// переменная стора
export const $newsList = createStore<News[]>([])

$newsList.on(getNewsListFx.doneData, updateStore )


export const $fetchErrorNewsList = createStore<Error | null>(null);
$fetchErrorNewsList
  .on(getNewsListFx.fail, (_, { error }) => error)
  .reset(getNewsListFx.done);


export const $newsListGetStatus = combine({
  loading: getNewsListFx.pending,
  error: $fetchErrorNewsList,
  data: $newsList,
});
