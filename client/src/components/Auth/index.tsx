import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import {useAuthStyles} from "./auth.style";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { registrationFx } from "../../models/UserModels/userRegistration";
import { registrationUser } from "../../models/UserModels/userTypes";
import {useStore} from "effector-react";
import { $isMobile } from "../../models/MediaModels";
import {clearError} from "../../models/UserModels";

const Auth = () => {

  const classes = useAuthStyles();
  const isMobile = useStore($isMobile)
  const [signIn, setSignIn] = useState(true)

  const handleChangeAuth = () => {
    clearError()
    setSignIn(value => !value)
  }

  const onRegister = async (data: registrationUser): Promise<boolean> => {
    await registrationFx(data)
      .then(() => {
        setSignIn(true)
        return true
      })
      .catch(() => {
        return false
      })
    return false
  };

  return (
    <div>
      <Typography variant={isMobile? "h4" : "h2"} gutterBottom className={classes.header}>
        {signIn ? "Войти" : "Регистрация"}
      </Typography>
      {signIn && <SignIn />}
      {!signIn && <SignUp onRegister={onRegister}/>}
      <div className={classes.footer}>
        {signIn? "Я не зарегистрирован, ": "У меня есть пользователь, "}
        <Button size="small" onClick={handleChangeAuth} color="primary">{signIn ? "Зарегистрироваться" : "Войти"}</Button>
      </div>
    </div>
  )}

export default Auth
