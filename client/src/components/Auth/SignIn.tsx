import {Controller, useForm} from "react-hook-form";
import {Button, TextField} from "@material-ui/core";
import React from "react";
import {useAuthStyles} from "./auth.style";
import {useStore} from "effector-react";
import {$userGetStatus} from "../../models/UserModels";
import Typography from "@material-ui/core/Typography";
import {LoginFx} from "../../models/UserModels/userLogin";
import { getError } from "../../utils/getFieldError";

const SignIn = (): JSX.Element => {
  const classes = useAuthStyles();
  const {
    handleSubmit,
    control
  } = useForm({mode: 'onBlur', reValidateMode: 'onChange'});

  const { loginError, loadingLogin }  = useStore($userGetStatus)

  // TODO: ошибки валидации class-validator приходят массивом, HttpException строкой..
  const getMessages = (message: string | string[]) => {
    if (typeof message === 'string') {
      return [message]
    }
    return message
  }

  const messages: string[] = loginError ? getMessages(loginError.response?.data.message) : [];

  return (
    <form autoComplete="off" className={classes.form} onSubmit={handleSubmit(LoginFx)}>
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
          helperText={getError(fieldState.error ? fieldState.error : null)}
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
          helperText={getError(fieldState.error ? fieldState.error : null)}
          error={!!fieldState.error}
        />}
      />

      {loginError && <div>
        {messages.map(error => {
          return (
            <Typography variant="subtitle2" gutterBottom color={'error'}>
              {error}
            </Typography>
          )
        })}
      </div>}

      <Button type="submit" variant="contained" color="primary" disabled={loadingLogin}>Войти</Button>
    </form>
  )
}

export default SignIn;
