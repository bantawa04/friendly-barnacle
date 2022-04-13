import React from "react";

// Material ui
import { Typography } from "@material-ui/core";

// custom components

// css *required
import { useStyles } from "./AppLogo.css";

//===================================================
// 1.Main Component
//===================================================
const AppLogo = (props) => {
  // 1-1. useStyles *require
  const classes = useStyles();

  // 1-2. Store

  // 1-3. useQuery, Mutation

  // showMain
  return showMain({
    ...props,
    classes,
  });
};
//===================================================
// 2.Export
//===================================================
export default AppLogo;

//===================================================
// 3.propTypes and defaultProps
//===================================================

//3-1. propTypes
AppLogo.propTypes = {};

//3-2. defaultProps
AppLogo.defaultProps = {};

//===================================================
// 4.Functions *require showMain()
//===================================================
/**
 * Show main
 * @param {*} props
 */
const showMain = (props) => {
  const { classes, history } = props;
  return (
    <Typography
      component="h1"
      variant="h6"
      className={classes.appLogo}
      onClick={() => history(`/`)}
    >
      MONEY USER
    </Typography>
  );
};

//===================================================
// 5.Actions
//===================================================
