import React, { useCallback, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { useStore } from 'effector-react';
import { useAuthStyles } from './auth.style';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { registrationUser, ResetPasswordData } from '../../models/UserModels/userTypes';
import { $isMobile } from '../../models/MediaModels';
import { clearError } from '../../models/UserModels';
import RecoveryPassword from './RecoveryPassword';
import { registrationFx, resetPasswordFx } from '../../models/UserModels/userEffects';

const Auth = () => {
  const classes = useAuthStyles();
  const isMobile = useStore($isMobile);

  // 1: авторизация, 2: регистрация. 3: восстановление парольки
  const [typePage, setTypePage] = useState(1);

  const getHeader = () => {
    switch (typePage) {
      case 2:
        return 'Регистрация';
      case 3:
        return 'Восстановление пароля';
      default:
        return 'Войти';
    }
  };

  const handleChangeAuth = useCallback((step: number) => {
    clearError();
    setTypePage(step);
  }, []);

  const onRegister = async (data: registrationUser): Promise<boolean> => {
    await registrationFx(data)
      .then(() => {
        setTypePage(1);
        return true;
      })
      .catch(() => false);
    return false;
  };

  const handleResetPassword = (data: ResetPasswordData) => {
    resetPasswordFx(data)
      .then(() => {
        setTypePage(1);
      })
      .finally(() => {
        clearError();
      });
  };

  return (
    <div>
      <Typography variant={isMobile ? 'h4' : 'h2'} gutterBottom className={classes.header}>
        {getHeader()}
      </Typography>
      {typePage === 1 && <SignIn />}
      {typePage === 2 && <SignUp onRegister={onRegister} />}

      {typePage !== 3 && (
        <div className={classes.footer}>
          {typePage === 1 ? 'Я не зарегистрирован, ' : 'У меня есть пользователь, '}
          <Button
            size="small"
            onClick={() => handleChangeAuth(typePage === 1 ? 2 : 1)}
            color="primary"
          >
            {typePage === 1 ? 'Зарегистрироваться' : 'Войти'}
          </Button>
        </div>
      )}

      {typePage === 1 && (
        <div className={classes.footer}>
          <Button
            size="small"
            onClick={() => handleChangeAuth(3)}
            variant="outlined"
            color="primary"
          >
            Забыл пароль
          </Button>
        </div>
      )}

      {typePage === 3 && (
        <>
          <RecoveryPassword resetPassword={handleResetPassword} />
          <Button
            size="small"
            onClick={() => handleChangeAuth(1)}
            variant="outlined"
            color="primary"
          >
            Вернуться к авторизации
          </Button>
        </>
      )}
    </div>
  );
};

export default Auth;
