import { Controller, useForm } from 'react-hook-form';
import { Button, TextField } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import React from 'react';
import { useStore } from 'effector-react';
import { userStylesUser } from './user.style';
import { getError } from '../../utils/getFieldError';
import ErrorList from '../ErrorList';
import { $fetchErrorChangePasswordUser, $userGetStatus } from '../../models/UserModels';
import getMessagesError from '../../utils/getMessagesError';

type ChangePasswordPropsType = {
  setChange: (block: number) => void;
  handleChangePassword: (data: {password: string, newPassword: string}) => void;
}

const ChangeUserPassword = ({ setChange, handleChangePassword }: ChangePasswordPropsType): JSX.Element => {
  const classes = userStylesUser();
  const passwordError = useStore($fetchErrorChangePasswordUser);
  const { loadingChangePassword } = useStore($userGetStatus);
  const {
    handleSubmit,
    control,
    watch,
  } = useForm({ mode: 'onBlur', reValidateMode: 'onChange' });

  const changePasswordErrorMessage: string[] = passwordError ? getMessagesError(passwordError.response?.data.message) : [];
  const newPassword = watch('newPassword', '');

  return (
    <Card className={classes.card}>

      <form autoComplete="off" className={classes.form} onSubmit={handleSubmit(handleChangePassword)}>

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
        <Controller
          name="newPassword"
          control={control}
          rules={{
            required: true,
            minLength: {
              value: 8,
              message: 'Пароль минимум 8 символов',
            },
          }}
          defaultValue=""
          render={({ field, fieldState }) => (
            <TextField
              label="новый пароль"
              variant="outlined"
              type="password"
              className={classes.input}
              {...field}
              helperText={getError(fieldState.error ? fieldState.error : null)}
              error={!!fieldState.error}
            />
          )}
        />
        <Controller
          name="confirmNewPassword"
          control={control}
          rules={{
            required: true,
            validate: (value) => value === newPassword || 'Пароли не совпадают',
          }}
          defaultValue=""
          render={({ field, fieldState }) => (
            <TextField
              label="Подтвердите новый пароль"
              variant="outlined"
              type="password"
              className={classes.input}
              {...field}
              helperText={getError(fieldState.error ? fieldState.error : null)}
              error={!!fieldState.error}
            />
          )}
        />
        {passwordError && <ErrorList errors={changePasswordErrorMessage} />}
        <div>
          <Button type="submit" variant="contained" className={classes.saveButton} color="primary" disabled={loadingChangePassword}>Изменить пароль</Button>
        </div>
      </form>
      <Button variant="contained" color="secondary" onClick={() => setChange(0)}>Отменить изменение пароля</Button>

    </Card>
  );
};

export default ChangeUserPassword;
