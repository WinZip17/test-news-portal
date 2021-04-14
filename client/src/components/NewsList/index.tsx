import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {useHistory} from "react-router-dom";
import NewsCard from "./NewsCard";
import { useStore } from 'effector-react';
import { $newsListGetStatus } from '../../store/models/NewsListModels/init';
import { getNewsListFx } from '../../store/models/NewsListModels';
import Card from "@material-ui/core/Card";

const useStyles = makeStyles({
  header: {
    textAlign: 'center'
  }
});


const NewsList = () => {

  const classes = useStyles();

  const { loading, error, data } = useStore($newsListGetStatus);

  const history = useHistory();

  useEffect(() => {
    getNewsListFx()
  },[])

  const handleNews = (newsId: number) => {
    history.push(`/news/${newsId}`)
  }

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
        {loading && <div>Загрузка...</div>}
        {data.map( item => <NewsCard news={item} handleNews={handleNews}  key={item.id.toString()} />)}
      </div>
  )

}

export default NewsList
