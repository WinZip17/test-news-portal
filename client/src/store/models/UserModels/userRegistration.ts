import {createEffect} from "effector";
import {registrationUser, User} from "./userTypes";
import {AxiosError} from "axios";
import ApiFactory from "../../../api/ApiFactory";
import {$modal} from "../ModalModels";

export const registrationFx = createEffect<registrationUser, User, AxiosError>(async (data) => {
  const api = new ApiFactory().userApi();
  const responce = await api.registration(data);
  return responce.data
});

$modal
  .on(registrationFx.doneData, () => ({
    title: 'Поздравляем!',
    content: 'Вы успешно зарегестрированы',
    open: true
  }))

$modal
  .on(registrationFx.fail, (state, {error}) => ({
    title: 'Внимание!',
    content: error ? error.response?.data.message : 'Что то пошло не так',
    open: true
  }))
