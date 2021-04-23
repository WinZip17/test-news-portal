import { makeStyles } from '@material-ui/core/styles';

export const addNewsStylesUser = makeStyles({
  header: {
    textAlign: 'center',
  },
  card: {
    '&:not(:last-child)': {
      marginBottom: 20,
    },
    padding: 10,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  newsWrap: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    marginBottom: 10,
  },
  input: {
    '&:not(:last-child)': {
      marginBottom: 10,
    },
  },
  inputFile: {
    display: 'none',
  },
  fileButton: {
    width: '100%',
  },
  saveButton: {
    marginBottom: 10,
    width: 'auto',
  },
});
