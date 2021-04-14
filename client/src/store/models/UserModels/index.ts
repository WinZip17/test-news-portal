import {createEffect, createStore} from "effector";
import {AxiosError} from "axios";
import ApiFactory from "../../../api/ApiFactory";
import { User} from "./userTypes";


export const getMeFx = createEffect<void, User, AxiosError>(async () => {
  const api = new ApiFactory().userApi();
  const responce = await api.getMe();
  return responce.data
});


export const $user = createStore<User | null>(null)

$user
  .on(getMeFx.doneData, (state, user) => user )
  .reset(getMeFx.fail)
