import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { useStore } from 'effector-react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import NewsCard from './NewsCard';
import { $newsListGetStatus, getNewsListFx } from '../../models/NewsListModels';

import Preloader from '../Preloader';

const useStyles = makeStyles({
  header: {
    textAlign: 'center',
  },
});

const NewsList = () => {
  const classes = useStyles();

  const { loading, error, data } = useStore($newsListGetStatus);

  const { news, page, lastPage } = data;

  const hasNextPage = page !== lastPage;

  const loadMore = () => {
    getNewsListFx(page + 1);
  };

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: '0px 0px 400px 0px',
  });

  const history = useHistory();

  useEffect(() => {
    getNewsListFx(1);
  }, []);

  const handleNews = (newsId: number) => {
    history.push(`/news/${newsId}`);
  };

  if (error) {
    return (
      <div>
        <span><b>Произошла ошибка: </b></span>
        <span>{error.message}</span>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h3" gutterBottom className={classes.header}>
        Свежие новости!
      </Typography>
      {news.map((item) => <NewsCard news={item} handleNews={handleNews} key={item.id.toString()} />)}
      {(loading || hasNextPage) && (
        <div ref={sentryRef}>
          <Preloader />
        </div>
      )}
    </div>
  );
};

export default NewsList;
