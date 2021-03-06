import { createEvent, createStore } from 'effector';
import { addNewsFx } from '../NewsModels/newsAdd';
import {
  changePasswordFx, recoveryPasswordFx, registrationFx, resetPasswordFx,
} from '../UserModels/userEffects';
import { removeCommentFx } from '../NewsModels/commentsFx';

export class ModalContentTypes {
  title = '';

  content = '';

  open = false;
}

type showModalType = {
  title: string;
  content: string;
}

export const showModal = createEvent<showModalType>();
export const closeModal = createEvent();

export const $modal = createStore<ModalContentTypes>(new ModalContentTypes());

$modal
  .on(showModal, (state, data) => ({ ...data, open: true }))
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
  }))
  .on(recoveryPasswordFx.fail, (state, { error }) => ({
    title: 'Внимание!',
    content: error ? error.response?.data.message : 'Что то пошло не так',
    open: true,
  }))
  .on(resetPasswordFx.fail, (state, { error }) => ({
    title: 'Внимание!',
    content: error ? error.response?.data.message : 'Что то пошло не так',
    open: true,
  }))
  .on(resetPasswordFx.doneData, (state, { message }) => ({
    title: 'Поздравляем!',
    content: message || 'Новый пароль установлен',
    open: true,
  }))
  .on(addNewsFx.done, () => ({
    title: 'Поздравляем!',
    content: 'Новость успешно добавлена',
    open: true,
  }))
  .on(addNewsFx.fail, () => ({
    title: 'Очень жаль',
    content: 'Не получилось добавить новость по неизвестным нам причинам',
    open: true,
  }))
  .on(removeCommentFx.doneData, (state, { message }) => ({
    title: 'Наконец-то',
    content: message || 'Мы думали этот позор уже никто не удалит...',
    open: true,
  }));
