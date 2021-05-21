import { Controller, useForm } from 'react-hook-form';
import { AvatarTypeMap, Button, TextField } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Avatar from '@material-ui/core/Avatar';
import { useStore } from 'effector-react';
import { registrationUser } from '../../models/UserModels/userTypes';
import { useAuthStyles } from './auth.style';
import { $userGetStatus } from '../../models/UserModels';
import { getError } from '../../utils/getFieldError';

type SignUpProps = {
  onRegister: (data: any) => Promise<boolean>,
}

const SignUp = ({ onRegister }: SignUpProps): JSX.Element => {
  const classes = useAuthStyles();
  const {
    handleSubmit,
    control,
    register,
    reset,
    watch,
  } = useForm({ mode: 'onBlur', reValidateMode: 'onChange' });

  const { isLoading } = useStore($userGetStatus);

  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  const avatar = watch('avatar', null);

  const imageRef = useRef<AvatarTypeMap>(null);

  const currentPassword = watch('password', '');

  const sendForm = async (data: registrationUser) => {
    const result = await onRegister(data);
    if (result) {
      reset();
    }
  };

  useEffect(() => {
    if (avatar && avatar.length && imageRef) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(avatar[0]);
    }
  }, [avatar]);

  return (
    <form autoComplete="off" className={classes.form} onSubmit={handleSubmit(sendForm)}>
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
        name="name"
        control={control}
        rules={{ required: true }}
        defaultValue=""
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
        <Avatar alt="photo" src={typeof image === 'string' ? image : ''} className={classes.large} />
        <input
          {...register('avatar')}
          className={classes.inputFile}
          accept="image/*"
          id="contained-button-file"
          type="file"
        />

        <label htmlFor="contained-button-file">
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

      <Button type="submit" variant="contained" color="primary" disabled={isLoading}>Зарегистрироваться</Button>
    </form>
  );
};

export default SignUp;
