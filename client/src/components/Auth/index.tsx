import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import {Button, TextField} from "@material-ui/core";
import {useAuthStyles} from "./auth.style";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {useMedia} from "../Hooks/useMedia";

const Auth = () => {
  const classes = useAuthStyles();
  const [isLoading, setIsLoading] = useState(false)
  const isMobile = useMedia(756);
  const [signIn, setSignIn] = useState(true)

  const handleChangeAuth = () => {
    setSignIn(value => !value)
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
      <Typography variant={isMobile? "h4" : "h2"} gutterBottom className={classes.header}>
        {signIn ? 'Войти' : 'Регистрация'}
      </Typography>
      {signIn && <SignIn getError={getError} onLogin={onLogin}/>}
      {!signIn && <SignUp getError={getError} onRegister={onRegister}/>}
      <div className={classes.footer}>
        {signIn? 'Я не зарегистрирован, ': 'У меня есть пользователь, '}
        <Button size="small" onClick={handleChangeAuth} color="primary">{signIn ? 'Зарегистрироваться' : 'Войти'}</Button>
      </div>
    </div>
  )}

export default Auth
