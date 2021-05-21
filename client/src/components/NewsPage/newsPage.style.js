import { makeStyles } from '@material-ui/core/styles';

const newsPageStyle = makeStyles({
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

export default newsPageStyle;
