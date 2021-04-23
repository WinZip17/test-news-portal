import React from 'react';
import { useStore } from 'effector-react';
import Typography from '@material-ui/core/Typography';
import { CommentType } from '../../models/NewsModels/newsTypes';
import { $user } from '../../models/UserModels';

type CommentsPropsType = {
  comments: CommentType[]
}

const Comments = ({ comments }: CommentsPropsType): JSX.Element => {
  const user = useStore($user);
  const userId = user ? user.id : 0;

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
        <div key={index.toString()}>
          {com.content}
        </div>
      ))}
    </div>
  );
};

export default Comments;
