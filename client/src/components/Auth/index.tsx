import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import {Button, TextField} from "@material-ui/core";
import {useAuthStyles} from "./auth.style";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SwipeableViews from 'react-swipeable-views';

const Auth = () => {
  const classes = useAuthStyles();
  const [isLoading, setIsLoading] = useState(false)

  const [signIn, setSignIn] = useState(0)

  const handleChangeAuth = () => {
    setSignIn(value => value === 0 ? 1 : 0)
  }

  const onLogin = (data: any) => {
    setIsLoading(true)
    console.log('onSubmit', data)
    setIsLoading(false)
  };

  const onRegister = (data: any) => {
    setIsLoading(true)
    console.log('onSubmit', data)
    setIsLoading(false)
  };

  const getError = (type: string) => {
    switch (type) {
      case 'required':
        return 'Поле обязательно'
      default:
        return ''
    }
  }

  return (
    <div>
      <SwipeableViews
        index={signIn}
      >
        <div>
          <Typography variant="h2" gutterBottom className={classes.header}>
            Войти
          </Typography>
          <SignIn getError={getError} onLogin={onLogin} />
        </div>
        <div>
          <Typography variant="h2" gutterBottom className={classes.header}>
            Зарегистрироваться
          </Typography>
          <SignUp getError={getError} onRegister={onRegister}/>
        </div>
      </SwipeableViews>
      <div className={classes.footer}>
        {signIn? 'Я не зарегистрирован, ': 'У меня есть пользователь, '}
        <Button size="small" onClick={handleChangeAuth} color="primary">{signIn === 0 ? 'Зарегистрироваться' : 'Войти'}</Button>
      </div>
    </div>
  )}

export default Auth
