import React from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { CircularProgress } from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: '100%',
      height: 100,
      alignItems: 'center',
      justifyContent: 'center'
    },
  }),
);

const Preloader = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  )
}

export default Preloader
