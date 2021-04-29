import {
  combine, createEvent, createStore,
} from 'effector';
import { AxiosError } from 'axios';
import { User } from './userTypes';
import {
  changePasswordFx, getMeFx, LoginFx, recoveryPasswordFx, registrationFx, resetPasswordFx, updateUserFx,
} from './userEffects';

const removeToken = (): void => {
  window.localStorage.removeItem('token');
};

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
  .on(updateUserFx.doneData, (state, user) => user)
  .reset(getMeFx.fail, changePasswordFx.done);

export const $fetchErrorLogin = createStore<AxiosError | null>(null);
$fetchErrorLogin
  .on(LoginFx.fail, (_, { error }: {error: AxiosError}) => {
    removeToken();
    return error;
  })
  .on(getMeFx.fail, () => removeToken())
  .reset(LoginFx.done, clearError);

export const $fetchErrorUpdateUser = createStore<AxiosError | null>(null);
$fetchErrorUpdateUser
  .on(updateUserFx.fail, (_, { error }: {error: AxiosError}) => error)
  .reset(LoginFx.done, clearError);

export const $fetchErrorChangePasswordUser = createStore<AxiosError | null>(null);
$fetchErrorUpdateUser
  .on(changePasswordFx.fail, (_, { error }: {error: AxiosError}) => error)
  .reset(changePasswordFx.done, clearError);

export const $fetchErrorRecoveryPasswordUser = createStore<AxiosError | null>(null);
$fetchErrorUpdateUser
  .on(recoveryPasswordFx.fail, (_, { error }: {error: AxiosError}) => error)
  .reset(recoveryPasswordFx.done, clearError);

export const $userGetStatus = combine({
  loadingChangePassword: changePasswordFx.pending,
  loadingRegister: registrationFx.pending,
  loadingLogin: LoginFx.pending,
  loadingGetMe: getMeFx.pending,
  loginError: $fetchErrorLogin,
  loadingRecoveryPassword: recoveryPasswordFx.pending,
  loadingResetPassword: resetPasswordFx.pending,
  loadingUpdateUser: updateUserFx.pending,
  updateError: $fetchErrorUpdateUser,
  user: $user,
});
