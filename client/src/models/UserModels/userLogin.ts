import {createEffect} from "effector";
import {User} from "./userTypes";
import {AxiosError} from "axios";
import ApiFactory from "../../api/ApiFactory";

export const LoginFx = createEffect<{email: string, password: string}, User, AxiosError>(async (data) => {
  const api = new ApiFactory().userApi();
  const responce = await api.login(data);
  if (responce.data.access_token) {
    window.localStorage.setItem('token', responce.data.access_token);
  }
  return responce.data.user
});
