import React from "react";

// custom components

//material-ui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";

// css *required
import { useStyles } from "./DeleteModal.css";

//===================================================
// 1.Main Component
//===================================================
const DeleteModal = (props) => {
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
export default DeleteModal;

//===================================================
// 3.propTypes and defaultProps
//===================================================

//3-1. propTypes
DeleteModal.propTypes = {};

//3-2. defaultProps
DeleteModal.defaultProps = {};

//===================================================
// 4.Functions *require showMain()
//===================================================
/**
 * Show main
 * @param {*} props
 */
const showMain = (props) => {
  const { classes, isVisible, handleCloseModal, onDeleteUser } = props;
  return (
    <Dialog
      open={isVisible}
      onClose={() => handleCloseModal()}
      maxWidth="xs"
      fullWidth
      className={classes.dialogBox}
    >
      <DialogContent className={classes.dialogContent}>
        <DialogContentText className={classes.dialogTitle}>
          Are you sure you want to delete?
        </DialogContentText>
        <DialogActions className={classes.dialogAction}>
          <Button
            onClick={() => handleCloseModal && handleCloseModal()}
            disableElevation
            className={classes.closeButton}
          >
            Cancel
          </Button>
          <Button
            onClick={() => onDeleteUser && onDeleteUser()}
            disableElevation
            className={classes.deleteButton}
          >
            Delete
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

//===================================================
// 5.Actions
//===================================================
