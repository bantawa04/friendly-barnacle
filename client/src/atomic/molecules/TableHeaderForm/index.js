import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

// material-ui
import {
  Box,
  Button,
  TextField,
  Typography,
  Avatar,
  CircularProgress,
} from "@material-ui/core";
import SettingsApplications from "@material-ui/icons/SettingsApplications";

// custom component
import useLocalStorage from "../../../common/useLocalStorage";
import Api from "../../../common/Api";
import SuccessSnackbar from "../../atoms/SuccessSnackbar";
import ErrorSnackBar from "../../atoms/ErrorSnackBar";

// css
import { useStyles } from "./index.css";

//===================================================
// 1.Main Component
//===================================================
const TableHeaderForm = ({ ...props }) => {
  // 1-1. useStyles *require
  const classes = useStyles();

  // 1-2. Store
  const navigate = useNavigate();

  const [token, setToken] = useLocalStorage("token", null);
  const [mksError, setError] = useState(null);
  const [toastVisible, setToastSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useLocalStorage("user", {});

  useEffect(() => {
    const timer = setTimeout(() => setToastSuccess(false), 2000);
    return () => clearTimeout(timer);
  }, [toastVisible]);

  useEffect(() => {
    const timer = setTimeout(() => setError(false), 2000);
    return () => clearTimeout(timer);
  }, [mksError]);

  // showMain
  return showMain({
    ...props,
    classes,
    setToken,
    mksError,
    setError,
    token,
    navigate,
    toastVisible,
    setToastSuccess,
    loading,
    setLoading,
    tableHeader: user?.tableHeaders,
    user,
    setUser,
  });
};

//===================================================
// 2.Export
//===================================================
export default TableHeaderForm;

//===================================================
// 3.propTypes and defaultProps
//===================================================
TableHeaderForm.propTypes = {};
TableHeaderForm.defaultProps = {};

//===================================================
// 4.Functions *require showMain()
//===================================================
/**
 * Show main
 * @param {*} props
 */
const showMain = (props) => {
  const {
    classes,
    tableHeader,
    toastVisible,
    mksError,
    setToastSuccess,
    setError,
  } = props;
  return (
    <Box className={classes.container}>
      <Avatar className={classes.avatar}>
        <SettingsApplications />
      </Avatar>
      <Typography component="h1" variant="h5">
        Change Table Header
      </Typography>
      <Formik
        initialValues={{
          mValue: tableHeader?.mValue ?? "",
          kValue: tableHeader?.kValue ?? "",
          sValue: tableHeader?.sValue ?? "",
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={Yup.object().shape({
          mValue: Yup.string().required("Value is required!"),
          kValue: Yup.string().required("Value is required!"),
          sValue: Yup.string().required("Value is required!"),
        })}
        onSubmit={(v, action) => handleOnSubmit({ ...v, ...action, ...props })}
      >
        {(formik_props) => showFields({ ...props, ...formik_props })}
      </Formik>
      <SuccessSnackbar
        open={toastVisible}
        message="Table header change successfully!"
        onClose={() => setToastSuccess(false)}
      />
      <ErrorSnackBar
        open={mksError ? true : false}
        message={mksError}
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
        id="mValue"
        name="mValue"
        label="M"
        type="mValue"
        autoComplete="mValue"
        autoFocus
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.mValue}
        error={touched.mValue && Boolean(errors.mValue)}
        helperText={touched.mValue && errors.mValue}
        fullWidth
      />
      <TextField
        variant="outlined"
        margin="normal"
        id="kValue"
        name="kValue"
        label="K"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.kValue}
        error={touched.kValue && Boolean(errors.kValue)}
        helperText={touched.kValue && errors.kValue}
        fullWidth
      />
      <TextField
        variant="outlined"
        margin="normal"
        id="sValue"
        name="sValue"
        label="S"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.sValue}
        error={touched.sValue && Boolean(errors.sValue)}
        helperText={touched.sValue && errors.sValue}
        fullWidth
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submitButton}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Save"}
      </Button>
    </form>
  );
};

//===================================================
// 5.Actions
//===================================================
/**
 * Save table header
 * @param {*} props
 */
const handleOnSubmit = async (props) => {
  const {
    mValue,
    kValue,
    sValue,
    token,
    setError,
    setToastSuccess,
    setLoading,
    resetForm,
    navigate,
    setUser,
    user,
  } = props;
  setLoading(true);
  setError(null);
  const response = await Api.saveTableHeader(
    {
      mValue,
      kValue,
      sValue,
      userId: user._id,
    },
    token
  );
  if (response) {
    if (response.status === 200) {
      setUser({ ...user, tableHeaders: { mValue, kValue, sValue } });
      setToastSuccess(true);
      setLoading(false);
      navigate("/dashboard");
    } else {
      const errorMsg = response.data.message;
      setLoading(false);
      resetForm({});
      if (typeof errorMsg !== "string") {
        setError(errorMsg[0].message);
      } else {
        setError(errorMsg);
      }
    }
  }
};
