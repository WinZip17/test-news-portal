import {makeStyles} from "@material-ui/core/styles";

export const useAuthStyles = makeStyles({
  header: {
    textAlign: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column"
  },
  input: {
    "&:not(:last-child)": {
      marginBottom: 10,
    }
  },
  footer: {
    marginTop: 20
  },
  inputFile: {
    display: "none"
  },
  fileButton: {
    width: "100%",
  },
  large: {
    width: 70,
    height: 70,
    marginRight: 20
  },
  avatarWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12
  }
});
