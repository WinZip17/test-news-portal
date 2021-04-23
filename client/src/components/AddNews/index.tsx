import React, { useEffect, useRef, useState } from 'react';
import { useStore } from 'effector-react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { Controller, useForm } from 'react-hook-form';
import {
  AvatarTypeMap, Button, TextField,
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { $user } from '../../models/UserModels';
import { addNewsStylesUser } from './addNews.style';
import { getError } from '../../utils/getFieldError';
import { AddNewsTypes } from '../../models/NewsModels/newsTypes';
import { addNewsFx } from '../../models/NewsModels/newsAdd';

const AddNews = () => {
  const user = useStore($user);
  const classes = addNewsStylesUser();
  const {
    handleSubmit,
    control,
    register,
    watch,
    reset,
  } = useForm({ mode: 'onBlur', reValidateMode: 'onChange' });
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  const newsImage = watch('image', null);

  const imageRef = useRef<AvatarTypeMap>(null);

  useEffect(() => {
    if (newsImage && newsImage.length && imageRef) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(newsImage[0]);
    }
  }, [newsImage]);

  const handleAddNews = (data: AddNewsTypes) => {
    addNewsFx(data)
      .then(() => {
        setImage(null);
        reset({
          title: '',
          content: '',
          image: null,
        });
      });
  };

  if (!user) {
    return (
      <Card className={classes.card}>
        <Typography variant="h6" gutterBottom>
          Добавить новости могут только авторизированные пользователи
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Войдите, что бы продолжить
        </Typography>
      </Card>
    );
  }

  return (
    <Card className={classes.card}>
      <Typography variant="h6" gutterBottom className={classes.header}>
        Заполните контент новости :)
      </Typography>
      <form autoComplete="off" className={classes.form} onSubmit={handleSubmit(handleAddNews)}>

        <Controller
          name="title"
          control={control}
          rules={{ required: true }}
          defaultValue=""
          render={({ field, fieldState }) => (
            <TextField
              label="Заголовок новости"
              variant="outlined"
              className={classes.input}
              {...field}
              helperText={getError(fieldState.error ? fieldState.error : null)}
              error={!!fieldState.error}
            />
          )}
        />

        <div className={classes.newsWrap}>

          {image && <img className={classes.image} src={image as string || ''} alt="" />}
          <input
            {...register('image')}
            className={classes.inputFile}
            accept="image/*"
            id="update-avatar"
            type="file"
          />

          <label htmlFor="update-avatar">
            <Button
              variant="contained"
              color="default"
              component="span"
              className={classes.fileButton}
              startIcon={<CloudUploadIcon />}
            >
              Добавить картинку
            </Button>
          </label>
        </div>

        <Controller
          name="content"
          control={control}
          rules={{ required: true }}
          defaultValue=""
          render={({ field, fieldState }) => (
            <TextField
              label="Текст новости"
              variant="outlined"
              multiline
              rows={7}
              className={classes.input}
              {...field}
              helperText={getError(fieldState.error ? fieldState.error : null)}
              error={!!fieldState.error}
            />
          )}
        />
        <div>
          <Button type="submit" variant="contained" className={classes.saveButton} color="primary" disabled={false}>Добавить новость</Button>
        </div>
      </form>
    </Card>
  );
};

export default AddNews;
