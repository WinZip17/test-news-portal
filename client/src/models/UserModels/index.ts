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
  .on([getMeFx.doneData, LoginFx.doneData, updateUserFx.doneData], (state, user) => user)
  .on(signOut, () => {
    removeToken();
    return null;
  })
  .reset(getMeFx.fail, changePasswordFx.done);

export const $fetchErrorLogin = createStore<AxiosError | null>(null);
$fetchErrorLogin
  .on(LoginFx.fail, (_, { error }: {error: AxiosError}) => {
    removeToken();
    return error;
  })
  .on(getMeFx.fail, () => removeToken())
  .reset(LoginFx.done, clearError);

export const $fetchUserError = createStore<AxiosError | null>(null);
$fetchUserError
  .on(updateUserFx.fail, (_, { error }: {error: AxiosError}) => error)
  .on(changePasswordFx.fail, (_, { error }: {error: AxiosError}) => error)
  .on(recoveryPasswordFx.fail, (_, { error }: {error: AxiosError}) => error)
  .reset(LoginFx.done, changePasswordFx.done, recoveryPasswordFx.done, clearError);

export const $userGetStatus = combine({
  loadingChangePassword: changePasswordFx.pending,
  loadingRegister: registrationFx.pending,
  loadingLogin: LoginFx.pending,
  loadingGetMe: getMeFx.pending,
  loadingRecoveryPassword: recoveryPasswordFx.pending,
  loadingResetPassword: resetPasswordFx.pending,
  loadingUpdateUser: updateUserFx.pending,
  userError: $fetchUserError,
  loginError: $fetchErrorLogin,
  user: $user,
});
