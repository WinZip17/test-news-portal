import { Controller, useForm } from 'react-hook-form';
import { Avatar, Button, TextField } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Card from '@material-ui/core/Card';
import React from 'react';
import { useStore } from 'effector-react';
import { getError } from '../../utils/getFieldError';
import { BASE_URL } from '../../constant';
import ErrorList from '../ErrorList';
import { useStylesUser } from './user.style';
import { $userGetStatus } from '../../models/UserModels';
import Auth from '../Auth';
import getMessagesError from '../../utils/getMessagesError';
import { updateUser } from '../../models/UserModels/userTypes';

type UpdateUserInfoPropsType = {
  setChange: (block: number) => void;
  handleUpdateUserInfo: (data: updateUser) => void;
  image: string | ArrayBuffer | null;
}

const UpdateUserInfo = ({ setChange, handleUpdateUserInfo, image }: UpdateUserInfoPropsType): JSX.Element => {
  const classes = useStylesUser();
  const {
    user, loadingUpdateUser, updateError,
  } = useStore($userGetStatus);
  const {
    handleSubmit,
    control,
    register,
  } = useForm({ mode: 'onBlur', reValidateMode: 'onChange' });
  const updateErrorMessage: string[] = updateError ? getMessagesError(updateError.response?.data.message) : [];

  if (!user) {
    return <Auth />;
  }

  return (
    <Card className={classes.card}>

      <form autoComplete="off" className={classes.form} onSubmit={handleSubmit(handleUpdateUserInfo)}>

        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          defaultValue={user.name}
          render={({ field, fieldState }) => (
            <TextField
              label="Имя"
              variant="outlined"
              className={classes.input}
              {...field}
              helperText={getError(fieldState.error ? fieldState.error : null)}
              error={!!fieldState.error}
            />
          )}
        />

        <div className={classes.avatarWrap}>
          <Avatar alt="photo" src={typeof image === 'string' ? image : user.avatar ? `${BASE_URL}/${user.avatar}` : ''} className={classes.changeAvatar} />
          <input
            {...register('avatar')}
            className={classes.inputFile}
            accept="image/*"
            id="update-avatar"
            type="file"
          />

          <label htmlFor="update-avatar">
            <Button
              variant="contained"
              color="default"
              component="span"
              className={classes.fileButton}
              startIcon={<CloudUploadIcon />}
            >
              Загрузить аватарку
            </Button>
          </label>
        </div>

        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          defaultValue=""
          render={({ field, fieldState }) => (
            <TextField
              label="Пароль"
              variant="outlined"
              type="password"
              className={classes.input}
              {...field}
              helperText={getError(fieldState.error ? fieldState.error : null)}
              error={!!fieldState.error}
            />
          )}
        />
        {updateError && <ErrorList errors={updateErrorMessage} />}
        <div>
          <Button type="submit" variant="contained" className={classes.saveButton} color="primary" disabled={loadingUpdateUser}>Сохранить изменения</Button>
        </div>
      </form>
      <Button variant="contained" color="secondary" onClick={() => setChange(0)}>Отменить редактирование </Button>

    </Card>
  );
};

export default UpdateUserInfo;
