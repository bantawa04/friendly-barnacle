import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  appLogo: {
    color: "#3f51b5",
    cursor: "pointer",
    marginLeft: 8,
  },
  userName: {
    color: "#3f51b5",
    letterSpacing: "1px",
    fontFamily: "Arial",
    fontSize: 16,
  },
}));
