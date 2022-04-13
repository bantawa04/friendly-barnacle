import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    background: "red",
    "& .MuiSnackbar-root": {
      right: "2% !important",
      top: "80px !important",
    },
  },
  snackbar: {
    "& .MuiSnackbarContent-root": {
      backgroundColor: "#D0342C !important",
    },
    "& .MuiSnackbarContent-action": {
      margin: 0,
      padding: "4px 0",
    },
  },
  icon: {
    fontSize: "1.25rem",
  },
  message: {
    marginLeft: "12px !important",
    fontWeight: "bold",
    fontSize: 13,
  },
}));
