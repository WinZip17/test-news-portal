import React, { useEffect } from 'react';
import { useStore } from 'effector-react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useParams } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import Preloader from '../Preloader';
import { getNewsFx, $newsGetStatus } from '../../models/NewsModels';
import { BASE_URL } from '../../constant';
import { $user } from '../../models/UserModels';
import { $newsListGetStatus } from '../../models/NewsListModels';
import { reactionsOneNewsFx } from '../../models/NewsListModels/newsReactions';
import { showModal } from '../../models/ModalModels';

const useStyles = makeStyles({
  header: {
    textAlign: 'center',
  },
  card: {
    '&:not(:last-child)': {
      marginBottom: 20,
    },
  },
  media: {
    padding: 8,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    borderRadius: 15,
  },
  newsButton: {
    '&:not(:last-child)': {
      paddingRight: 10,
    },
    display: 'flex',
    alignItems: 'center',
  },
  reactionsWrap: {
    display: 'flex',
  },
});

const NewsPage = () => {
  const classes = useStyles();

  const {
    news, loading, error, loadingReactions,
  } = useStore($newsGetStatus);

  const params: {id: string} = useParams();
  const user = useStore($user);
  const userId = user ? user.id : 0;

  useEffect(() => {
    if (params) {
      const id = Number(params.id);
      getNewsFx({ id });
    }
  }, [params]);

  const handleReactions = (reaction: string) => {
    if (!loadingReactions && news) {
      if (userId) {
        reactionsOneNewsFx({ reaction, id: news.id });
      } else {
        showModal({ title: 'Хорошая попытка,', content: 'но лайкать и дизлайкать могут только авторизированные пользователи' });
      }
    }
  };

  return (
    <div>
      <Typography variant="h3" gutterBottom className={classes.header}>
        И так, внимание!!!
      </Typography>
      {loading && <Preloader />}
      {news && (
        <Card className={classes.card} key={news.id}>
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
            <Typography variant="body2" color="textSecondary" component="p">
              {news.content}
            </Typography>
            <div className={classes.reactionsWrap}>
              <div className={classes.newsButton}>
                <IconButton
                  aria-label="Лайк"
                  color={news.like.includes(userId) ? 'primary' : undefined}
                  onClick={() => handleReactions('like')}
                >
                  <ThumbUpAltIcon />
                </IconButton>
                {news.like.length}
              </div>
              <div className={classes.newsButton}>
                <IconButton
                  aria-label="Дизлайк"
                  color={news.dislike.includes(userId) ? 'primary' : undefined}
                  onClick={() => handleReactions('dislike')}
                >
                  <ThumbDownAltIcon />
                </IconButton>
                {news.dislike.length}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {error && <div>{error}</div>}
    </div>
  );
};

export default NewsPage;
