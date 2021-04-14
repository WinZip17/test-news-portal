import { createEvent, createStore } from "effector";
import { registrationFx } from "../UserModels/userRegistration";

export class ModalContentTypes {
  title = '';
  content = '';
  open = false;
}

export const showModal = createEvent<ModalContentTypes>();
export const closeModal = createEvent();


export const $modal = createStore<ModalContentTypes>(new ModalContentTypes())

$modal
  .on(showModal , (state, data) =>data)

$modal
  .on(closeModal, () => new ModalContentTypes() )


