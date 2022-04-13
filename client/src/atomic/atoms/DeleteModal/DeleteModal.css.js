import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  dialogBox: {
    "& .MuiDialog-paperWidthXs": {
      maxWidth: 406,
    },
  },
  dialogContent: {
    padding: "32px 24px 24px 32px !important",
  },
  dialogAction: {
    marginTop: theme.spacing(6),
    padding: 0,
  },
  dialogTitle: {
    fontSize: 16,
    fontFamily: "SegoeUI",
    color: "#474747",
    letterSpacing: 0.4,
  },
  closeButton: {
    color: "#474747",
    fontSize: 14,
    lineHeight: "unset",
    fontFamily: "SegoeUI",
    textTransform: "none",
    backgroundColor: "#E8E8E8",
    padding: 8,
    minWidth: 100,
    "&:hover": {
      backgroundColor: "#E8E8E8",
    },
  },
  deleteButton: {
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: "unset",
    fontFamily: "SegoeUI",
    textTransform: "none",
    backgroundColor: "#DC004E",
    padding: 8,
    minWidth: 100,
    "&:hover": {
      backgroundColor: "#DC004E",
    },
  },
}));
