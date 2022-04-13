import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

// custom components

// Material-ui
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Box from "@material-ui/core/Box";
import {
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@material-ui/core";

// css *required
import { useStyles } from "./AddAccount.css";

//===================================================
// 1.Main Component
//===================================================
const AddAccount = (props) => {
  // 1-1. useStyles *require
  const classes = useStyles();

  // 1-2. Store
  const [list, setList] = useState(null);
  const [error, setError] = useState(false);

  // 1-3. useQuery, Mutation

  // 1-4. useEffect
  useEffect(() => {
    if (list) {
      setError(false);
      props.addAccountList(list);
    }
  }, [list]);

  // showMain
  return showMain({
    classes,
    list,
    setList,
    error,
    setError,
    ...props,
  });
};

//===================================================
// 2.Export
//===================================================
export default AddAccount;

//===================================================
// 3.propTypes and defaultProps
//===================================================

//3-1. propTypes
AddAccount.propTypes = {};

//3-2. defaultProps
AddAccount.defaultProps = {};

//===================================================
// 4.Functions *require showMain()
//===================================================
/**
 * Show main
 * @param {*} props
 */
const showMain = (props) => {
  const { classes, onCloseAddListModal, open, setError } = props;
  return (
    <Dialog
      open={open}
      onClose={() => {
        onCloseAddListModal();
        setError(false);
      }}
      aria-labelledby="add-account-dialog"
      maxWidth="sm"
      fullWidth
      className={classes.dialogBox}
    >
      <DialogContent className={classes.dialogContent}>
        <Formik
          initialValues={{
            M: "",
            K: "",
            S: "",
          }}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={Yup.object().shape({
            M: Yup.string()
              .matches(/^[0-9]*\.?[0-9]*$/, "The field should have digits only")
              .required("M is required field!"),
            K: Yup.string()
              .matches(/^[0-9]*\.?[0-9]*$/, "The field should have digits only")
              .required("K is required field!"),
            S: Yup.string()
              .matches(/^[0-9]*\.?[0-9]*$/, "The field should have digits only")
              .required("S is required field!"),
          })}
          onSubmit={(v) => onAddListClicked({ ...v, ...props })}
        >
          {(formik_props) => getFormField({ ...props, ...formik_props })}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

const getFormField = (props) => {
  const {
    classes,
    handleChange,
    handleSubmit,
    values,
    onCloseAddListModal,
    errors,
    setError,
    isLoading,
    tableHeader,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Box mt={2} mb={2}>
        <Typography component="p" className={classes.dialogTitle}>
          Add Account Form
        </Typography>
      </Box>
      <TextField
        margin="dense"
        id="M"
        label={tableHeader?.mValue ?? "M"}
        type="text"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        value={values.M}
        onChange={handleChange}
      />
      {errors && errors.M && (
        <Typography className={classes.errorText} component="p">
          {errors.M}
        </Typography>
      )}
      <TextField
        margin="dense"
        id="K"
        label={tableHeader?.kValue ?? "K"}
        type="text"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        value={values.K}
        onChange={handleChange}
      />
      {errors && errors.K && (
        <Typography className={classes.errorText} component="p">
          {errors.K}
        </Typography>
      )}
      <TextField
        margin="dense"
        id="S"
        label={tableHeader?.sValue ?? "S"}
        type="text"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        value={values.S}
        onChange={handleChange}
      />
      {errors && errors.S && (
        <Typography className={classes.errorText} component="p">
          {errors.S}
        </Typography>
      )}

      <DialogActions className={classes.dialogAction}>
        <Button
          onClick={() => {
            onCloseAddListModal();
            setError(false);
          }}
          variant="contained"
          disableElevation
          className={classes.cancelButton}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          disableElevation
          className={classes.updateButton}
          type="submit"
        >
          {isLoading ? <CircularProgress size={20} color="inherit" /> : "Add"}
        </Button>
      </DialogActions>
    </form>
  );
};

//===================================================
// 5.Actions
//===================================================
/**
 * add account
 * @param {*} params
 */
const onAddListClicked = (props) => {
  const { M, K, S, setList, setError } = props;
  let obtainList = {
    key: Date.now(),
    M: M,
    K: K,
    S: S,
  };
  setList(obtainList);
  setError(true);
};
