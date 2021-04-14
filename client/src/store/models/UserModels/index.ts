import {createEffect, createStore} from "effector";
import {AxiosError} from "axios";
import ApiFactory from "../../../api/ApiFactory";

export interface User {
  id: number;
  name: string;
  email: string;
}

export const getMeFx = createEffect<void, User, AxiosError>(async () => {
  const api = new ApiFactory().userApi();
  const responce = await api.getMe();
  return responce.data
});

export const $user = createStore<User | null>(null)
