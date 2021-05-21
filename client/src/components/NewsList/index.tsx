import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { useStore } from 'effector-react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import Preloader from '../Preloader';
import newsListStyle from './newsList.style';
import { $newsListGetStatus, getNewsListFx } from '../../models/NewsListModels';
import NewsCard from './NewsCard';

const NewsList = () => {
  const classes = newsListStyle();
  const history = useHistory();

  const { loading, error, data: { news, page, lastPage } } = useStore($newsListGetStatus);

  const hasNextPage = page !== lastPage;

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: () => getNewsListFx(page + 1),
    disabled: !!error,
    rootMargin: '0px 0px 400px 0px',
  });

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
