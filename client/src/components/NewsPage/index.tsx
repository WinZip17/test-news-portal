import React, {useEffect} from "react";
import { getNewsFx } from "../../models/NewsModels";
import {useStore} from "effector-react";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import {BASE_URL} from "../../constant";
import CardContent from "@material-ui/core/CardContent";
import {useParams} from "react-router-dom";
import { $newsGetStatus } from "../../models/NewsModels";
import Preloader from "../Preloader";

const useStyles = makeStyles({
  header: {
    textAlign: "center"
  },
  card: {
    "&:not(:last-child)": {
      marginBottom: 20,
    }
  },
  media: {
    padding: 8,
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
    borderRadius: 15
  },

});

const NewsPage = () => {
  const classes = useStyles();

  const { news, loading, error} = useStore($newsGetStatus);

  const params: {id: string} = useParams();

  useEffect(() => {
    if (params) {
      const id = Number(params.id)
      getNewsFx({id})
    }
  }, [params])

  return (
    <div>
      <Typography variant="h3" gutterBottom className={classes.header}>
        И так, внимание!!!
      </Typography>
      {loading &&  <Preloader />}
      {news && (
        <Card className={classes.card} key={news.id} >
          <CardActionArea>
            {news.image && (
              <img
                className={classes.media}
                src={BASE_URL + "/" + news.image}
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
        </Card>
      )}

      {error && <div>{error}</div>}
    </div>
  )}

export default NewsPage
