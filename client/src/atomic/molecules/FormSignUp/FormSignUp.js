import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

// material-ui
import {
  Button,
  TextField,
  Typography,
  Avatar,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Box,
} from "@material-ui/core";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import CircularProgress from "@material-ui/core/CircularProgress";

// custom component
import useLocalStorage from "../../../common/useLocalStorage";
import Api from "../../../common/Api";
import SuccessSnackbar from "../../atoms/SuccessSnackbar";
import ErrorSnackBar from "../../atoms/ErrorSnackBar";

// css
import { useStyles } from "./FormSignUp.css";

//===================================================
// 1.Main Component
//===================================================
const FormSignUp = ({ ...props }) => {
  // 1-1. useStyles *require
  const classes = useStyles();

  // 1-2. Store
  const [toastVisible, setToastSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registerError, setError] = useState(null);
  const [token] = useLocalStorage("token", null);

  useEffect(() => {
    const timer = setTimeout(() => setToastSuccess(false), 2000);
    return () => clearTimeout(timer);
  }, [toastVisible]);

  useEffect(() => {
    const timer = setTimeout(() => setError(false), 2000);
    return () => clearTimeout(timer);
  }, [registerError]);

  // showMain
  return showMain({
    ...props,
    classes,
    toastVisible,
    setToastSuccess,
    registerError,
    setError,
    token,
    loading,
    setLoading,
  });
};
//===================================================
// 2.Export
//===================================================
export default FormSignUp;

//===================================================
// 3.propTypes and defaultProps
//===================================================
FormSignUp.propTypes = {};
FormSignUp.defaultProps = {};

//===================================================
// 4.Functions *require showMain()
//===================================================
/**
 * Show main
 * @param {*} props
 */
const showMain = (props) => {
  const { classes, toastVisible, registerError, setToastSuccess, setError } =
    props;
  return (
    <Box className={classes.container}>
      <Avatar className={classes.avatar}>
        <HowToRegIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <Formik
        initialValues={{
          name: "",
          address: "",
          email: "",
          phone: "",
          password: "",
          role: "1",
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("User Name is required!"),
          address: Yup.string().required("Address is required!"),
          email: Yup.string()
            .email("Please enter a valid Email Address!")
            .required("Email is required!"),
          phone: Yup.string().required("Please enter phone!"),
          password: Yup.string()
            .min(6, "Password must be at least 6 characters!")
            .required("Password is required!"),
        })}
        onSubmit={(v, action) => handleOnSubmit({ ...v, ...action, ...props })}
      >
        {(formik_props) => showFields({ ...props, ...formik_props })}
      </Formik>
      <SuccessSnackbar
        open={toastVisible}
        message="User created successfully"
        onClose={() => setToastSuccess(false)}
      />
      <ErrorSnackBar
        open={registerError ? true : false}
        message={registerError}
        onClose={() => setError(false)}
      />
    </Box>
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
  } = props;
  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <TextField
        variant="outlined"
        margin="normal"
        id="name"
        name="name"
        label="Name"
        type="name"
        autoComplete="name"
        autoFocus
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        error={touched.name && Boolean(errors.name)}
        helperText={touched.name && errors.name}
        fullWidth
      />
      <TextField
        variant="outlined"
        margin="normal"
        id="address"
        name="address"
        label="Address"
        type="address"
        autoComplete="address"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.address}
        error={touched.address && Boolean(errors.address)}
        helperText={touched.address && errors.address}
        fullWidth
      />
      <TextField
        variant="outlined"
        margin="normal"
        id="email"
        name="email"
        label="Email Address"
        type="email"
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
        id="phone"
        name="phone"
        label="Phone"
        type="phone"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.phone}
        error={touched.phone && Boolean(errors.phone)}
        helperText={touched.phone && errors.phone}
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
      <FormControl fullWidth>
        <InputLabel id="select-role-label">Role</InputLabel>
        <Select
          labelId="select-role-label"
          id="select-role"
          name="role"
          value={values.role}
          label="Role"
          onChange={handleChange}
        >
          <MenuItem value={"1"}>Normal User</MenuItem>
          <MenuItem value={"2"}>Admin</MenuItem>
        </Select>
      </FormControl>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submitButton}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
      </Button>
    </form>
  );
};

//===================================================
// 5.Actions
//===================================================
/**
 * Register user
 * @param {*} props
 */
const handleOnSubmit = async (props) => {
  const {
    name,
    address,
    phone,
    password,
    email,
    role = 1,
    setError,
    token,
    setToastSuccess,
    resetForm,
    setLoading,
  } = props;
  setError(null);
  setLoading(true);
  const response = await Api.registerUser(
    {
      name,
      address,
      email,
      password,
      phone: parseInt(phone),
      role: parseInt(role),
    },
    token
  );
  if (response) {
    if (response.status === 200) {
      resetForm({});
      setToastSuccess(true);
      setLoading(false);
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
