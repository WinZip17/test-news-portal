import {createEffect} from "effector";
import {updateUser, User} from "./userTypes";
import {AxiosError} from "axios";
import ApiFactory from "../../api/ApiFactory";

export const updateUserFx = createEffect<updateUser, User, AxiosError>(async (data) => {
  const api = new ApiFactory().userApi();
  const response = await api.updateUser(data);
  return response.data
});
