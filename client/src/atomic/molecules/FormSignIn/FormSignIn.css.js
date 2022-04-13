import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    alignItems: "center",
  },
  submitButton: {
    margin: theme.spacing(3, 0, 2),
  },
}));
