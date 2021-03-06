import { Controller, useForm } from 'react-hook-form';
import { Button, TextField } from '@material-ui/core';
import React from 'react';
import { useStore } from 'effector-react';
import { useAuthStyles } from './auth.style';
import { $userGetStatus } from '../../models/UserModels';
import { getError } from '../../utils/getFieldError';
import getMessagesError from '../../utils/getMessagesError';
import ErrorList from '../ErrorList';
import { LoginFx } from '../../models/UserModels/userEffects';

const SignIn = (): JSX.Element => {
  const classes = useAuthStyles();
  const {
    handleSubmit,
    control,
  } = useForm({ mode: 'onBlur', reValidateMode: 'onChange' });

  const { loginError, isLoading } = useStore($userGetStatus);

  const messagesErrors: string[] = loginError ? getMessagesError(loginError.response?.data.message) : [];

  return (
    <form autoComplete="off" className={classes.form} onSubmit={handleSubmit(LoginFx)}>
      <Controller
        name="email"
        control={control}
        rules={{ required: true }}
        defaultValue=""
        render={({ field, fieldState }) => (
          <TextField
            label="Email"
            variant="outlined"
            className={classes.input}
            {...field}
            helperText={getError(fieldState.error ? fieldState.error : null)}
            error={!!fieldState.error}
          />
        )}
      />

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

      {loginError && <ErrorList errors={messagesErrors} />}

      <Button type="submit" variant="contained" color="primary" disabled={isLoading}>Войти</Button>
    </form>
  );
};

export default SignIn;
