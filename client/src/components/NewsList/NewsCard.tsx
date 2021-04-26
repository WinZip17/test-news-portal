import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import { useStore } from 'effector-react';
import parse from 'html-react-parser';
import { $newsListGetStatus, NewsListItem } from '../../models/NewsListModels';
import { BASE_URL } from '../../constant';
import { $user } from '../../models/UserModels';
import { reactionsNewsFx } from '../../models/NewsListModels/newsReactions';
import { showModal } from '../../models/ModalModels';

const useStyles = makeStyles({
  card: {
    '&:not(:last-child)': {
      marginBottom: 20,
    },
  },
  media: {
    padding: 8,
    width: 'auto',
    maxWidth: 'calc(100% - 16px)',
    maxHeight: 400,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    borderRadius: 15,
  },
  CardActionsButton: {
    '&:not(:last-child)': {
      paddingRight: 10,
    },
    display: 'flex',
    alignItems: 'center',
  },
});

type NewsCardPros = {
  news: NewsListItem;
  handleNews: (id: number) => void;
}

const NewsCard = ({ news, handleNews }: NewsCardPros): JSX.Element => {
  const classes = useStyles();
  const user = useStore($user);
  const { reactionLoading } = useStore($newsListGetStatus);
  const userId = user ? user.id : 0;
  const handleReactions = (reaction: string) => {
    if (!reactionLoading) {
      if (userId) {
        reactionsNewsFx({ reaction, id: news.id });
      } else {
        showModal({ title: 'Хорошая попытка,', content: 'но лайкать и дизлайкать могут только авторизированные пользователи' });
      }
    }
  };

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={() => handleNews(news.id)}>
        {news.image && (
          <img
            className={classes.media}
            src={`${BASE_URL}/${news.image}`}
            title="image"
            alt="news logo"
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {news.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="div">
            {parse(news.content)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <div className={classes.CardActionsButton}>
          <IconButton
            aria-label="Лайк"
            color={news.like.includes(userId) ? 'primary' : undefined}
            onClick={() => handleReactions('like')}
          >
            <ThumbUpAltIcon />
          </IconButton>
          {news.like.length}
        </div>
        <div className={classes.CardActionsButton}>
          <IconButton
            aria-label="Дизлайк"
            color={news.dislike.includes(userId) ? 'primary' : undefined}
            onClick={() => handleReactions('dislike')}
          >
            <ThumbDownAltIcon />
          </IconButton>
          {news.dislike.length}
        </div>
        <div className={classes.CardActionsButton}>
          Комментариев:
          {' '}
          {news.commentCount}
        </div>
      </CardActions>
    </Card>
  );
};

export default NewsCard;
