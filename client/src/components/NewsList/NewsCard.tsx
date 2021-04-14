import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import {BASE_URL} from "../../constant";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import { News } from "../../store/models/NewsListModels";

const useStyles = makeStyles({
  card: {
    '&:not(:last-child)': {
      marginBottom: 20,
    }
  },
  media: {
    padding: 8,
    width: 'auto',
    maxWidth: 'calc(100% - 16px)',
    maxHeight: 400,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    borderRadius: 15
  },
});

type NewsCardPros = {
  news: News;
  handleNews: (id: number) => void;
}

const NewsCard = ( { news, handleNews }: NewsCardPros): JSX.Element => {

  const classes = useStyles();

  return (
    <Card className={classes.card} onClick={() => handleNews(news.id)}>
      <CardActionArea>
        {news.image && (
          <img
            className={classes.media}
            src={BASE_URL + '/' + news.image}
            title="image"
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {news.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {news.content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}

export default NewsCard;
