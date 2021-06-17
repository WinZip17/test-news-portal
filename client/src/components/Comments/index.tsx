import React, { useCallback } from 'react';
import { useStore } from 'effector-react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { format, isToday, isYesterday } from 'date-fns';
import { Controller, useForm } from 'react-hook-form';
import { Avatar, Button, TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { getError } from '../../utils/getFieldError';
import { $user } from '../../models/UserModels';
import { CommentType } from '../../models/NewsModels/newsTypes';
import { addCommentFx, removeCommentFx } from '../../models/NewsModels/commentsFx';
import { $newsGetStatus } from '../../models/NewsModels';
import { BASE_URL } from '../../constant';

const useStyles = makeStyles({
  input: {
    '&:not(:last-child)': {
      marginBottom: 10,
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  commentBlock: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    border: '1px solid grey',
    padding: 10,
    '&:not(:last-child)': {
      marginBottom: 10,
    },
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  avatar: {
    marginRight: 10,
  },
  deleteIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

type CommentsPropsType = {
  comments: CommentType[],
  NewsId: number
}

const Comments = ({ comments, NewsId }: CommentsPropsType): JSX.Element => {
  const classes = useStyles();
  const { loadingAddComment } = useStore($newsGetStatus);
  const user = useStore($user);
  const isAdmin = user?.role === 'admin';

  const {
    handleSubmit,
    control,
    reset,
  } = useForm({ mode: 'onBlur', reValidateMode: 'onChange' });

  const handleAddComment = (data: any) => {
    addCommentFx({ ...data, NewsId })
      .then(() => {
        reset({
          content: '',
        });
      });
  };

  const handleRemoveComment = useCallback((id: number) => {
    removeCommentFx(id);
  }, []);

  const getDateInfo = (date: string) => {
    const workDate = new Date(date);
    if (isToday(workDate)) {
      return format(workDate, 'Сегодня в HH:mm');
    }
    if (isYesterday(workDate)) {
      return format(workDate, 'Вчера в HH:mm');
    }
    return format(workDate, 'dd.MM.yyyy в HH:mm');
  };

  return (
    <div>
      <Typography gutterBottom variant="h6" component="h6">
        Комментарии:
      </Typography>
      {comments.length === 0 && (
        <Typography gutterBottom variant="subtitle2" component="p">
          Еще не оставляли комментариев, вы можете быть первым
        </Typography>
      )}
      {comments.map((com, index) => (
        <div key={index.toString()} className={classes.commentBlock}>
          <div className={classes.userInfo}>
            <Avatar alt="photo" src={`${BASE_URL}/static/${com.user.avatar}`} className={classes.avatar} />
            <Typography gutterBottom variant="h6" component="div">
              {com.user.name}
            </Typography>
            {isAdmin && (
            <IconButton type="button" aria-label="delete" className={classes.deleteIcon} onClick={() => handleRemoveComment(com.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
            )}
          </div>
          <div>
            <Typography gutterBottom variant="subtitle1" component="p">
              {com.content}
            </Typography>
            <Typography gutterBottom variant="caption" component="p">
              {getDateInfo(com.createdAt)}
            </Typography>
          </div>
        </div>
      ))}
      {user && (
        <form autoComplete="off" className={classes.form} onSubmit={handleSubmit(handleAddComment)}>

          <Controller
            name="content"
            control={control}
            rules={{
              required: true,
              minLength: {
                value: 5,
                message: 'Комментарий не меньше 5 символов',
              },
            }}
            defaultValue=""
            render={({ field, fieldState }) => (
              <TextField
                label="Комментарий"
                variant="outlined"
                multiline
                rows={2}
                className={classes.input}
                {...field}
                helperText={getError(fieldState.error ? fieldState.error : null)}
                error={!!fieldState.error}
              />
            )}
          />
          <div>
            <Button type="submit" variant="contained" color="primary" disabled={loadingAddComment}>Отправить</Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Comments;
