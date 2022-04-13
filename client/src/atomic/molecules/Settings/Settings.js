import React from "react";

// custom components
import { signOut } from "../../../common/Utility";

// material-ui
import Typography from "@material-ui/core/Typography";

// icons
import ExitToApp from "@material-ui/icons/ExitToApp";

// css *required
import { useStyles } from "./Settings.css";

//===================================================
// 1.Main Component
//===================================================
const Settings = (props) => {
  // 1-1. useStyles *require
  const classes = useStyles();

  // 1-2. Store

  // showMain
  return showMain({
    ...props,
    classes,
  });
};
//===================================================
// 2.Export
//===================================================
export default Settings;

//===================================================
// 3.propTypes and defaultProps
//===================================================

//3-1. propTypes
Settings.propTypes = {};

//3-2. defaultProps
Settings.defaultProps = {};

//===================================================
// 4.Functions *require showMain()
//===================================================
/**
 * Show main
 * @param {*} props
 */
const showMain = (props) => {
  const { classes, userInfo } = props;
  return (
    <Typography component="div" className={classes.root}>
      <Typography component="h1" variant="h6" className={classes.userName}>
        {userInfo && userInfo.name}
      </Typography>
      <ExitToApp onClick={() => signOut()} className={classes.appLogo} />
    </Typography>
  );
};

//===================================================
// 5.Actions
//===================================================
