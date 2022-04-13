import React from "react";

// atomic
import Footer from "../../organisms/Footer/Footer";

// material-ui
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

// css *required
import { useStyles } from "./Single.css";

//===================================================
// 1.Main Component
//===================================================
const Single = (props) => {
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
export default Single;

//===================================================
// 3.propTypes and defaultProps
//===================================================

//3-1. propTypes
Single.propTypes = {};

//3-2. defaultProps
Single.defaultProps = {};

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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>{props.children}</div>
      <Footer />
    </Container>
  );
};

//===================================================
// 5.Actions
//===================================================
