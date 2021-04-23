import { makeStyles } from '@material-ui/core/styles';

export const useStylesUser = makeStyles({
  header: {
    textAlign: 'center',
  },
  card: {
    '&:not(:last-child)': {
      marginBottom: 20,
    },
    padding: 10,
  },
  button: {
    '&:not(:last-child)': {
      marginRight: 20,
    },
  },
  avatarWrap: {
    display: 'flex',
    marginBottom: 20,
    alignItems: 'center',
  },
  avatar: {
    marginLeft: 20,
    width: 70,
    height: 70,
  },
  changeAvatar: {
    marginRight: 20,
    width: 70,
    height: 70,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
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
