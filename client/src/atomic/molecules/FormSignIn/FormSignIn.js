import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

// material-ui
import { Button, TextField, Typography, Avatar } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";

// custom component
import useLocalStorage from "../../../common/useLocalStorage";
import Api from "../../../common/Api";
import SuccessSnackbar from "../../atoms/SuccessSnackbar";
import ErrorSnackBar from "../../atoms/ErrorSnackBar";

// css
import { useStyles } from "./FormSignIn.css";

//===================================================
// 1.Main Component
//===================================================
const FormSignIn = ({ ...props }) => {
  // 1-1. useStyles *require
  const classes = useStyles();

  // 1-2. Store
  const [token, setToken] = useLocalStorage("token", null);
  const [user, setUser] = useLocalStorage("user", null);
  const [loading, setLoading] = useState(false);
  const [toastVisible, setToastSuccess] = useState(false);
  const [loginError, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setToastSuccess(false), 2000);
    return () => clearTimeout(timer);
  }, [toastVisible]);

  useEffect(() => {
    const timer = setTimeout(() => setError(false), 2000);
    return () => clearTimeout(timer);
  }, [loginError]);

  // showMain
  return showMain({
    ...props,
    classes,
    setToken,
    user,
    setUser,
    loginError,
    setError,
    loading,
    setLoading,
    toastVisible,
    setToastSuccess,
  });
};
//===================================================
// 2.Export
//===================================================
export default FormSignIn;

//===================================================
// 3.propTypes and defaultProps
//===================================================
FormSignIn.propTypes = {};
FormSignIn.defaultProps = {};

//===================================================
// 4.Functions *require showMain()
//===================================================
/**
 * Show main
 * @param {*} props
 */
const showMain = (props) => {
  const { classes, toastVisible, setToastSuccess, loginError, setError } =
    props;
  return (
    <React.Fragment>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
      <Formik
        initialValues={{ email: "", password: "" }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Please enter a valid email address!")
            .required("Email is required!"),
          password: Yup.string()
            .min(6, "Password must be at least 6 characters!")
            .required("Password is required!"),
        })}
        onSubmit={(v) => handleOnSubmit({ ...v, ...props })}
      >
        {(formik_props) => showFields({ ...props, ...formik_props })}
      </Formik>
      <SuccessSnackbar
        open={toastVisible}
        message="User login successfully"
        onClose={() => setToastSuccess(false)}
      />
      <ErrorSnackBar
        open={loginError ? true : false}
        message={loginError}
        onClose={() => setError(false)}
      />
    </React.Fragment>
  );
};

/**
 * showFields
 * @param {*} param0
 */
const showFields = (props) => {
  const {
    classes,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    loading,
    loginError,
  } = props;
  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <TextField
        variant="outlined"
        margin="normal"
        id="email"
        name="email"
        label="Email Address"
        type="email"
        autoComplete="email"
        autoFocus
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        error={touched.email && Boolean(errors.email)}
        helperText={touched.email && errors.email}
        fullWidth
      />
      <TextField
        variant="outlined"
        margin="normal"
        id="password"
        name="password"
        label="Password"
        type="password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
        error={touched.password && Boolean(errors.password)}
        helperText={touched.password && errors.password}
        fullWidth
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submitButton}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
      </Button>
    </form>
  );
};

//===================================================
// 5.Actions
//===================================================
/**
 * Login user
 * @param {*} props
 */
const handleOnSubmit = async (props) => {
  const {
    email,
    password,
    setToken,
    setUser,
    setError,
    setLoading,
    setToastSuccess,
  } = props;
  setError(null);
  setLoading(true);
  const response = await Api.login({
    email,
    password,
  });
  if (response) {
    if (response.status === 200) {
      const user = response.data.data.user;
      setToastSuccess(true);
      setLoading(false);
      await setUser(user);
      await setToken(user.token);
      window.location.reload();
    } else {
      const errorMsg = response.data.message;
      setLoading(false);
      if (typeof errorMsg !== "string") {
        setError(errorMsg[0].message);
      } else {
        setError(errorMsg);
      }
    }
  }
};
