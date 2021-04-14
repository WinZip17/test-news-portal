import {Controller, useForm} from "react-hook-form";
import {Button, TextField} from "@material-ui/core";
import React from "react";
import {useAuthStyles} from "./auth.style";

type SignInProps = {
  onLogin: (data: any) => void,
  getError: (error: string) => string,
}

const SignIn = ({ onLogin, getError }: SignInProps): JSX.Element => {
  const classes = useAuthStyles();
  const {
    handleSubmit,
    control
  } = useForm({mode: 'onBlur', reValidateMode: 'onChange'});

  return (
    <form autoComplete="off" className={classes.form} onSubmit={handleSubmit(onLogin)}>
      <Controller
        name="email"
        control={control}
        rules={{required: true}}
        defaultValue={''}
        render={({field, fieldState}) => <TextField
          label="Email"
          variant="outlined"
          className={classes.input}
          {...field}
          helperText={getError(fieldState.error ? fieldState.error.type : '')}
          error={!!fieldState.error}
        />}
      />

      <Controller
        name="password"
        control={control}
        rules={{required: true}}
        defaultValue={''}
        render={({field, fieldState}) => <TextField
          label="Пароль"
          variant="outlined"
          type="password"
          className={classes.input}
          {...field}
          helperText={getError(fieldState.error ? fieldState.error.type : '')}
          error={!!fieldState.error}
        />}
      />

      <Button type="submit" variant="contained" color="primary">Войти</Button>
    </form>
  )
}

export default SignIn;
