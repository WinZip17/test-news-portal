import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useStore } from 'effector-react';
import { useAuthStyles } from './auth.style';
import { getError } from '../../utils/getFieldError';
import { recoveryPasswordFx } from '../../models/UserModels/userRecoveryPassword';
import { $fetchErrorRecoveryPasswordUser, $userGetStatus, clearError } from '../../models/UserModels';
import getMessagesError from '../../utils/getMessagesError';
import ErrorList from '../ErrorList';
import { ResetPasswordData } from '../../models/UserModels/userTypes';

type RecoveryPasswordType = {
  resetPassword: (data: ResetPasswordData) => void
}

const RecoveryPassword = ({ resetPassword }: RecoveryPasswordType): JSX.Element => {
  const classes = useAuthStyles();
  const [step, setStep] = useState(1);
  const {
    handleSubmit,
    control,
    watch,
  } = useForm({ mode: 'onBlur', reValidateMode: 'onChange' });
  const sendEmailError = useStore($fetchErrorRecoveryPasswordUser);
  const { loadingRecoveryPassword, loadingResetPassword } = useStore($userGetStatus);
  const sendEmailErrorMessage: string[] = sendEmailError ? getMessagesError(sendEmailError.response?.data.message) : [];

  const currentPassword = watch('password', '');
  const email = watch('email', '');

  const handleSendEmail = (data: {email: string}) => {
    recoveryPasswordFx(data)
      .then(() => {
        setStep(2);
      })
      .finally(() => {
        clearError();
      });
  };

  const sendNewPassword = (data: {code: string, password: string}) => {
    resetPassword({ ...data, email });
  };

  return (
    <>
      {step === 1 && (
        <form autoComplete="off" className={classes.form} onSubmit={handleSubmit(handleSendEmail)}>
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
          {sendEmailError && <ErrorList errors={sendEmailErrorMessage} />}
          <Typography variant="subtitle1" gutterBottom>
            На ваш почтовый адрес будет отправлен код для подтверждения сброса пароля
          </Typography>

          <Button type="submit" variant="contained" color="primary" disabled={loadingRecoveryPassword}>Продолжить</Button>
        </form>
      )}

      {step === 2 && (
        <form autoComplete="off" className={classes.form} onSubmit={handleSubmit(sendNewPassword)}>
          <Typography variant="h5" gutterBottom>
            Мы отправили на ваш email код для подтверждения смены пароля.
          </Typography>
          <Typography variant="caption" gutterBottom>
            Введите код и новый пароль с подтверждением для продолжения этого загадочного процесса
          </Typography>
          <Controller
            name="code"
            control={control}
            rules={{ required: true }}
            defaultValue=""
            render={({ field, fieldState }) => (
              <TextField
                label="Код"
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
            name="confirmPassword"
            control={control}
            rules={{
              required: true,
              validate: (value) => value === currentPassword || 'Пароли не совпадают',
            }}
            defaultValue=""
            render={({ field, fieldState }) => (
              <TextField
                label="Подтвердите пароль"
                variant="outlined"
                type="password"
                className={classes.input}
                {...field}
                helperText={getError(fieldState.error ? fieldState.error : null)}
                error={!!fieldState.error}
              />
            )}
          />
          <Button type="button" variant="contained" onClick={() => setStep(1)} className={classes.input}>Выслать код на другой e-mail</Button>
          <Button type="submit" variant="contained" color="primary" disabled={loadingResetPassword}>Изменить пароль</Button>

        </form>
      )}
    </>
  );
};

export default RecoveryPassword;
