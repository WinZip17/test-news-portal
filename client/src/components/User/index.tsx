import React, {useRef, useState} from "react";
import {useStore} from "effector-react";
import Auth from "../Auth";
import { $userGetStatus } from "../../models/UserModels";
import Preloader from "../Preloader";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {Avatar, AvatarTypeMap, Button, TextField} from "@material-ui/core";
import {signOut} from "../../models/UserModels";
import {BASE_URL} from "../../constant";
import {Controller, useForm} from "react-hook-form";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { getError } from "../../utils/getFieldError";

const useStyles = makeStyles({
  header: {
    textAlign: 'center'
  },
  card: {
    '&:not(:last-child)': {
      marginBottom: 20,
    },
    padding: 10
  },
  button: {
    '&:not(:last-child)': {
      marginRight: 20,
    }
  },
  avatarWrap: {
    display: 'flex',
    marginBottom: 20,
    alignItems: 'center',
  },
  avatar: {
    marginLeft: 20,
    width: 70,
    height: 70
  },
  changeAvatar: {
    marginRight: 20,
    width: 70,
    height: 70
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    '&:not(:last-child)': {
      marginBottom: 10,
    }
  },
  inputFile: {
    display: 'none'
  },
  fileButton: {
    width: '100%',
  },

});

const User = () => {
  const { user, loadingGetMe} = useStore($userGetStatus)
  const classes = useStyles();
  const {
    handleSubmit,
    control,
    register,
    reset,
    watch
  } = useForm({mode: 'onBlur', reValidateMode: 'onChange'});

  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  const avatar = watch("avatar", null);

  const imageRef = useRef<AvatarTypeMap>(null)


  const [change, setChange] = useState(false)

  if (loadingGetMe) {
    return <Preloader />
  }

  if (!user) {
    return <Auth />
  }

  const handleSignOut = () => {
    signOut()
  }

  const sendForm = (data: any) => {
    console.log(data)
  }

  return (
    <div>
      <Card className={classes.card} >
        <Typography variant="h5" gutterBottom className={classes.header}>
          Информация о пользователе:
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Почтовый адрес: {user.email}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Имя: {user.name}
        </Typography>
        {user.avatar && <div className={classes.avatarWrap}>
          <Typography variant="subtitle1" gutterBottom>
            Аватарка:
          </Typography>
          <Avatar src={BASE_URL + '/' + user.avatar} className={classes.avatar}/>
        </div>}
        <Button variant="contained" color="primary" className={classes.button} onClick={handleSignOut}>Выйти</Button>
        {!change && <Button variant="contained" color="secondary" onClick={() => setChange(true)}>Редактировать данные</Button>}
      </Card>
      {change && (
        <Card className={classes.card}>

          <form autoComplete="off" className={classes.form} onSubmit={handleSubmit(sendForm)}>

            <Controller
              name="name"
              control={control}
              rules={{required: true}}
              defaultValue={user.name}
              render={({field, fieldState}) => <TextField
                label="Имя"
                variant="outlined"
                className={classes.input}
                {...field}
                helperText={getError(fieldState.error ? fieldState.error : null)}
                error={!!fieldState.error}
              />}
            />

            <div className={classes.avatarWrap}>
              <Avatar alt="photo" src={typeof image === "string" ? image : user.avatar? BASE_URL + '/' + user.avatar : ''} className={classes.changeAvatar}/>
              <input
                {...register("avatar")}
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
              rules={{required: true, minLength: {
                  value: 8,
                  message: "Пароль минимум 8 символов"
                }}}
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

            <Button type="submit" variant="contained" className={classes.button} color="primary" disabled={false}>Зарегистрироваться</Button>
          </form>


          {change && <Button variant="contained" color="secondary" onClick={() => setChange(false)}>Отменить редактирование </Button>}
        </Card>
      )}
    </div>
  )
}

export default User
