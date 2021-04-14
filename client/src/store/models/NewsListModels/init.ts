import {combine, createStore} from "effector";
import {$newsList, getNewsListFx} from "./index";

export const $fetchErrorNewsList = createStore<Error | null>(null);
$fetchErrorNewsList
  .on(getNewsListFx.fail, (_, { error }) => error)
  .reset(getNewsListFx.done);


export const $newsListGetStatus = combine({
  loading: getNewsListFx.pending,
  error: $fetchErrorNewsList,
  data: $newsList,
});
