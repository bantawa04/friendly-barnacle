import React from "react";

// custom components
import AppHeader from "../../organisms/AppHeader/AppHeader";
import Footer from "../../organisms/Footer/Footer";

// css *required
import { useStyles } from "./Dashboard.css";

// Material-ui
import { CssBaseline } from "@material-ui/core";
//===================================================
// 1.Main Component
//===================================================
const Dashboard = (props) => {
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
export default Dashboard;

//===================================================
// 3.propTypes and defaultProps
//===================================================

//3-1. propTypes
Dashboard.propTypes = {};

//3-2. defaultProps
Dashboard.defaultProps = {};

//===================================================
// 4.Functions *require showMain()
//===================================================
/**
 * Show main
 * @param {*} props
 */
const showMain = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppHeader />
      {props.children}
      <Footer />
    </div>
  );
};

//===================================================
// 5.Actions
//===================================================
