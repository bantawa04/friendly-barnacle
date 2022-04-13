import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  dialogBox: {
    "& .MuiPaper-rounded": {
      borderRadius: 0,
    },
  },
  dialogContent: {
    padding: "32px !important",
  },
  dialogAction: {
    marginTop: theme.spacing(2),
    padding: "8px 0 0 0",
  },
  dialogTitle: {
    fontFamily: `'Roboto', sans-serif`,
    fontSize: 16,
    color: "#000000",
    fontWeight: 500,
  },
  cancelButton: {
    backgroundColor: "#E0E0E0",
    fontSize: 14,
    fontFamily: `'Roboto', sans-serif`,
    lineHeight: "unset",
    fontWeight: "normal",
    textTransform: "none",
    minWidth: 100,
    padding: 8,
  },
  updateButton: {
    backgroundColor: "#3f51b5",
    color: "#ffffff",
    fontSize: 14,
    fontFamily: `'Roboto', sans-serif`,
    lineHeight: "unset",
    fontWeight: "normal",
    textTransform: "none",
    minWidth: 100,
    padding: 8,
    "&:hover": {
      backgroundColor: "#3f51b5",
    },
  },
  errorText: {
    color: "#FF0000",
    marginTop: theme.spacing(1),
    fontSize: 14,
  },
}));
