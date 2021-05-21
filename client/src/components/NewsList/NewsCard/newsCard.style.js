import { makeStyles } from '@material-ui/core/styles';

const newsCardStyle = makeStyles({
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

export default newsCardStyle;
