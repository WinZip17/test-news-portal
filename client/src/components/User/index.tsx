import React, { useEffect, useRef, useState } from 'react';
import { useStore } from 'effector-react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import {
  Avatar, AvatarTypeMap, Button,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import {
  signOut, $userGetStatus, clearError,
} from '../../models/UserModels';
import { BASE_URL } from '../../constant';
import Preloader from '../Preloader';
import Auth from '../Auth';
import { updateUserFx } from '../../models/UserModels/userUpdate';
import { updateUser } from '../../models/UserModels/userTypes';
import { changePasswordFx } from '../../models/UserModels/userChangePassword';
import UpdateUserInfo from './UpdateUserInfo';
import { userStylesUser } from './user.style';
import ChangeUserPassword from './ChangeUserPassword';

const User = () => {
  const classes = userStylesUser();

  const { user, loadingGetMe } = useStore($userGetStatus);

  const { reset, watch } = useForm({ mode: 'onBlur', reValidateMode: 'onChange' });

  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  const avatar = watch('avatar', null);

  const imageRef = useRef<AvatarTypeMap>(null);

  // 0: не изменять, 1: данные пользователя, 2: смена пароля
  const [change, setChange] = useState(0);

  useEffect(() => {
    if (change && avatar && avatar.length && imageRef) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(avatar[0]);
    }
  }, [avatar, change]);

  if (loadingGetMe) {
    return <Preloader />;
  }

  if (!user) {
    return <Auth />;
  }

  const handleSignOut = () => {
    signOut();
  };

  const handleUpdateUserInfo = async (data: updateUser) => {
    await updateUserFx(data)
      .then(() => {
        setChange(0);
        reset();
      })
      .finally(() => {
        clearError();
      });
  };

  const handleChangePassword = async (data: {password: string, newPassword: string}) => {
    await changePasswordFx(data)
      .then(() => {
        setChange(0);
        reset();
      })
      .finally(() => {
        clearError();
      });
  };

  return (
    <div>
      <Card className={classes.card}>
        <Typography variant="h5" gutterBottom className={classes.header}>
          Информация о пользователе:
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Почтовый адрес:
          {' '}
          {user.email}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Имя:
          {' '}
          {user.name}
        </Typography>
        {user.avatar && (
        <div className={classes.avatarWrap}>
          <Typography variant="subtitle1" gutterBottom>
            Аватарка:
          </Typography>
          <Avatar src={`${BASE_URL}/${user.avatar}`} className={classes.avatar} />
        </div>
        )}
        <Button variant="contained" color="primary" className={classes.button} onClick={handleSignOut}>Выйти</Button>
        {change !== 1 && <Button variant="contained" color="secondary" className={classes.button} onClick={() => setChange(1)}>Редактировать данные</Button>}
        {change !== 2 && <Button variant="contained" className={classes.button} onClick={() => setChange(2)}>Изменить пароль</Button>}
      </Card>
      {change === 1 && (
        <UpdateUserInfo
          setChange={setChange}
          handleUpdateUserInfo={handleUpdateUserInfo}
          image={image}
        />
      )}
      {change === 2 && (
        <ChangeUserPassword
          setChange={setChange}
          handleChangePassword={handleChangePassword}
        />
      )}
    </div>
  );
};

export default User;
