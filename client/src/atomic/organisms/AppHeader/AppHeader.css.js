import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  appBar: {
    boxShadow: "0px 3px 6px #00000029",
    backgroundColor: "#FFFFFF",
    "& .MuiToolbar-gutters": {
      paddingLeft: "15px !important",
    },
    "& .MuiIconButton-root": {
      padding: "10px !important",
    },
    position: "fixed",
  },
  toolbar: {
    display: "flex",
  },
  iconMargin: {
    marginRight: 5,
  },
  divider: {
    flexGrow: 1,
    backgroundColor: "transparent",
  },
  menuItem: {
    letterSpacing: "1px",
    fontFamily: "Arial",
    fontSize: 16,
    marginLeft: 8,
  },
  menuItemGap: {
    margin: "4px 14px",
  },
  unselectedNavLink: {
    color: "#707070",
    cursor: "pointer",
  },
  selectedNavLink: {
    color: "#3f51b5",
    fontWeight: "600",
    cursor: "default",
  },
}));
