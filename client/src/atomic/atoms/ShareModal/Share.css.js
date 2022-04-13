import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  dialogBox: {
    "& .MuiPaper-rounded": {
      borderRadius: 0,
    },
  },
  dialogContent: {
    padding: "0 24px !important",
    textAlign: "center",
  },
  dialogTitle: {
    "& .MuiTypography-root": {
      display: "flex",
      alignItems: "center",
      color: "#000000",
      fontFamily: `'Roboto', sans-serif`,
      fontSize: 20,
      fontWeight: 500,
    },
  },
  shareButton: {
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
  shareIcon: {
    color: "#3f51b5",
    marginRight: 14,
  },
  dialogAction: {
    margin: 6,
  },
  section: {
    margin: 2,
  },
  text: {
    marginBottom: 12,
    flex: 1,
  },
  table: {
    display: "flex",
    flexDirection: "row",
  },
  tableContainer: {
    marginTop: 16,
  },
  border: {
    borderTop: "2px solid #000000",
    paddingTop: 8,
  },
}));
