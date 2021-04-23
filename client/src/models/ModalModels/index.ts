import { createEvent, createStore } from 'effector';
import { registrationFx } from '../UserModels/userRegistration';
import { changePasswordFx } from '../UserModels/userChangePassword';

export class ModalContentTypes {
  title = '';

  content = '';

  open = false;
}

export const showModal = createEvent<ModalContentTypes>();
export const closeModal = createEvent();

export const $modal = createStore<ModalContentTypes>(new ModalContentTypes());

$modal
  .on(showModal, (state, data) => data)
  .on(closeModal, (state) => ({ ...state, open: false }))
  .on(registrationFx.doneData, () => ({
    title: 'Поздравляем!',
    content: 'Вы успешно зарегистрированы',
    open: true,
  }))
  .on(registrationFx.fail, (state, { error }) => ({
    title: 'Внимание!',
    content: error ? error.response?.data.message : 'Что то пошло не так',
    open: true,
  }))
  .on(changePasswordFx.fail, (state, { error }) => ({
    title: 'Внимание!',
    content: error ? error.response?.data.message : 'Что то пошло не так',
    open: true,
  }))
  .on(changePasswordFx.doneData, (state, { message }) => ({
    title: 'Поздравляем',
    content: message || 'Пароль изменен',
    open: true,
  }));
