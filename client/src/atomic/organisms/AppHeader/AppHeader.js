import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

// custom components
import AppLogo from "../../atoms/AppLogo/AppLogo";
import Settings from "../../molecules/Settings/Settings";
import useLocalStorage from "../../../common/useLocalStorage";

// Material-ui
import { AppBar, Toolbar, Divider, Typography } from "@material-ui/core";

// css *required
import { useStyles } from "./AppHeader.css";

//===================================================
// 1.Main Component
//===================================================
const AppHeader = (props) => {
  // 1-1. useStyles *require
  const classes = useStyles();

  // 1-2. Store
  let history = useNavigate();
  let location = useLocation();
  const [user] = useLocalStorage("user", null);

  // 1-3. useQuery, Mutation

  // showMain
  return showMain({
    ...props,
    classes,
    user,
    history,
    location,
  });
};
//===================================================
// 2.Export
//===================================================
export default AppHeader;

//===================================================
// 3.propTypes and defaultProps
//===================================================

//3-1. propTypes
AppHeader.propTypes = {};

//3-2. defaultProps
AppHeader.defaultProps = {};

//===================================================
// 4.Functions *require showMain()
//===================================================
/**
 * Show main
 * @param {*} props
 */
const showMain = (props) => {
  const { classes, history, location, user } = props;
  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <AppLogo history={history} />
        {user && user.role === 2 ? (
          <>
            <Typography
              component="h1"
              variant="h6"
              className={`${classes.menuItem} ${
                location.pathname === "/" || location.pathname === "/history"
                  ? classes.selectedNavLink
                  : classes.unselectedNavLink
              } `}
              onClick={() => history(`/`)}
            >
              User
            </Typography>
            <Typography
              component="h1"
              variant="h6"
              className={`${classes.menuItem} ${classes.menuItemGap} ${
                location.pathname === "/register"
                  ? classes.selectedNavLink
                  : classes.unselectedNavLink
              } `}
              onClick={() => history(`/register`)}
            >
              Register
            </Typography>
          </>
        ) : (
          <Typography
            component="h1"
            variant="h6"
            className={`${classes.menuItem} ${
              location.pathname === "/tableHeader"
                ? classes.selectedNavLink
                : classes.unselectedNavLink
            } `}
            onClick={() => history(`/tableHeader`)}
          >
            Table Header
          </Typography>
        )}
        <Divider className={classes.divider} />
        <Settings userInfo={user} />
      </Toolbar>
    </AppBar>
  );
};

//===================================================
// 5.Actions
//===================================================
