import {makeStyles} from "@material-ui/core/styles";

export const useAuthStyles = makeStyles({
  header: {
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    '&:not(:last-child)': {
      marginBottom: 10,
    }
  },
  footer: {
    marginTop: 20
  }
});
