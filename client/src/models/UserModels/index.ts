import {
  combine, createEffect, createEvent, createStore,
} from 'effector';
import { AxiosError } from 'axios';
import ApiFactory from '../../api/ApiFactory';
import { User } from './userTypes';
import { LoginFx } from './userLogin';
import { registrationFx } from './userRegistration';
import { updateUserFx } from './userUpdate';

const removeToken = (): void => {
  window.localStorage.removeItem('token');
};

export const getMeFx = createEffect<void, User, AxiosError>(async () => {
  const api = new ApiFactory().userApi();
  const responce = await api.getMe();
  return responce.data;
});

export const signOut = createEvent();

export const clearError = createEvent();

export const $user = createStore<User | null>(null);

$user
  .on(getMeFx.doneData, (state, user) => user)
  .on(LoginFx.doneData, (state, user) => user)
  .on(signOut, () => {
    removeToken();
    return null;
  })
  .on(updateUserFx.doneData, (state, user) => {
    console.log('updateUserFx user', user);
    return user;
  })
  .reset(getMeFx.fail);

export const $fetchErrorLogin = createStore<AxiosError | null>(null);
$fetchErrorLogin
  .on(LoginFx.fail, (_, { error }: {error: AxiosError}) => {
    removeToken();
    return error;
  })
  .on(getMeFx.fail, (_, { error }: {error: AxiosError}) => removeToken())
  .reset(LoginFx.done, clearError);

export const $fetchErrorUpdateUser = createStore<AxiosError | null>(null);
$fetchErrorUpdateUser
  .on(updateUserFx.fail, (_, { error }: {error: AxiosError}) => error)
  .reset(LoginFx.done, clearError);

export const $userGetStatus = combine({
  loadingRegister: registrationFx.pending,
  loadingLogin: registrationFx.pending,
  loadingGetMe: getMeFx.pending,
  loginError: $fetchErrorLogin,
  loadingUpdateUser: updateUserFx.pending,
  updateError: $fetchErrorUpdateUser,
  user: $user,
});
