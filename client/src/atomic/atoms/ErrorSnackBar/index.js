import React from "react";

// Material ui
import { Snackbar, Slide, Typography, Container } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";

// custom components

// css *required
import { useStyles } from "./index.css";

//===================================================
// 1.Main Component
//===================================================
const ErrorSnackBar = (props) => {
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
export default ErrorSnackBar;

//===================================================
// 3.propTypes and defaultProps
//===================================================

//3-1. propTypes
ErrorSnackBar.propTypes = {};

//3-2. defaultProps
ErrorSnackBar.defaultProps = {};

//===================================================
// 4.Functions *require showMain()
//===================================================
/**
 * Show main
 * @param {*} props
 */
const showMain = (props) => {
  const { classes, open, message, onClose } = props;
  return (
    <Container className={classes.root}>
      <Snackbar
        autoHideDuration={8000}
        open={open}
        className={classes.snackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={onClose}
        TransitionComponent={(props) => <Slide {...props} direction="left" />}
        key={"snackbar-right"}
        action={
          <>
            <ErrorIcon className={classes.icon} />
            <Typography className={classes.message}>{message}</Typography>
          </>
        }
      />
    </Container>
  );
};

//===================================================
// 5.Actions
//===================================================
