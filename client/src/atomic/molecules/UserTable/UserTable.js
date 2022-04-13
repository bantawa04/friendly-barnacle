/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// custom component
import useLocalStorage from "../../../common/useLocalStorage";
import Api from "../../../common/Api";

// material-ui
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteModal from "../../atoms/DeleteModal/DeleteModal";

// icons
import Delete from "@material-ui/icons/Delete";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";

// css *required
import { useStyles } from "./UserTable.css";

//===================================================
// 1.Main Component
//===================================================
const UserTable = (props) => {
  // 1-1. useStyles *require
  const classes = useStyles();

  // 1-2. Store
  let history = useNavigate();
  const [userList, setUserList] = useState([]);
  const [user] = useLocalStorage("user", {});
  const [token] = useLocalStorage("token", null);

  const [loading, setLoading] = useState(true);
  const [transactionError, setError] = useState(null);
  const [deleteVisible, setDeleteModal] = useState(false);
  const [deletedId, setDeletedId] = useState(null);

  // 1-3. api
  useEffect(() => {
    handleFetchAllUsers(setUserList, setLoading, setError, token);
  }, []);

  // 1-4. useEffect

  // showMain
  return showMain({
    ...props,
    classes,
    userList,
    setUserList,
    loading,
    setLoading,
    user,
    token,
    transactionError,
    setError,
    deleteVisible,
    setDeleteModal,
    deletedId,
    setDeletedId,
    history,
  });
};

//===================================================
// 2.Export
//===================================================
export default UserTable;

//===================================================
// 3.propTypes and defaultProps
//===================================================

//3-1. propTypes
UserTable.propTypes = {};

//3-2. defaultProps
UserTable.defaultProps = {};

//===================================================
// 4.Functions *require showMain()
//===================================================
/**
 * Show main
 * @param {*} props
 */
const showMain = (props) => {
  const { classes, deleteVisible, setDeleteModal } = props;
  return (
    <div className={classes.root}>
      <TableContainer className={classes.tableContainer}>
        <Table
          stickyHeader
          className={classes.table}
          aria-label="user-setting-table"
        >
          {showTableHead(props)}
          {showTableBody(props)}
        </Table>
      </TableContainer>
      <DeleteModal
        isVisible={deleteVisible}
        handleCloseModal={() => setDeleteModal(false)}
        onDeleteUser={() => onDeletedClicked(props)}
      />
    </div>
  );
};

/**
 * display table header
 * @param {*} props
 * @returns
 */
const showTableHead = (props) => {
  const { classes } = props;
  return (
    <TableHead>
      <TableRow>
        <TableCell className={classes.tableHeadCell}>ID</TableCell>
        <TableCell className={classes.tableHeadCell}>User Name</TableCell>
        <TableCell className={classes.tableHeadCell}>Email</TableCell>
        <TableCell className={classes.tableHeadCell}>View</TableCell>
        <TableCell className={classes.tableHeadCell} align="center">
          Actions
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

/**
 * display table body
 */
const showTableBody = (props) => {
  const { classes, userList, loading, history } = props;
  if (loading) {
    return (
      <TableBody>
        <TableRow>
          <TableCell
            align="center"
            colSpan={5}
            className={classes.tableBodyCell}
          >
            <CircularProgress size={20} />
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }
  if (userList && userList.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell
            className={classes.tableBodyCell + "" + classes.emptyTableList}
            colSpan={5}
          >
            No user Found.
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }
  return (
    <TableBody>
      {userList.length > 0 &&
        userList.map((list, index) => {
          return (
            <TableRow key={list._id + index} className={classes.table}>
              <TableCell
                className={
                  classes.tableBodyCell +
                  " " +
                  classes.styledMemo +
                  " " +
                  classes.innerTableBodyCell
                }
                valign="top"
              >
                {index + 1}
              </TableCell>

              <TableCell
                className={
                  classes.tableBodyCell + " " + classes.innerTableBodyCell
                }
              >
                {list.name}
              </TableCell>
              <TableCell
                className={
                  classes.tableBodyCell + " " + classes.innerTableBodyCell
                }
              >
                {list.email}
              </TableCell>
              <TableCell
                className={
                  classes.tableBodyCell +
                  " " +
                  classes.styledMemo +
                  " " +
                  classes.innerTableBodyCell
                }
                valign="top"
              >
                <IconButton
                  onClick={() =>
                    history(`/history`, {
                      state: list,
                    })
                  }
                  aria-label="user-list-delete row"
                  size="small"
                >
                  <RemoveRedEyeIcon htmlColor="#3f51b5" />
                </IconButton>
              </TableCell>
              <TableCell className={classes.tableBodyCell} align="center">
                <IconButton
                  aria-label="user-list-delete row"
                  size="small"
                  onClick={() => handleSetDelete(list._id, props)}
                >
                  <Delete htmlColor="#FF4848" />
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}
    </TableBody>
  );
};
//===================================================
// 5.Actions
//===================================================
const handleSetDelete = (id, props) => {
  const { setDeletedId, setDeleteModal } = props;
  setDeletedId(id);
  setDeleteModal(true);
};
/**
 * delete account list
 * @param {*} params
 */
const onDeletedClicked = async (props) => {
  const {
    userList,
    setUserList,
    setLoading,
    token,
    setError,
    setDeleteModal,
    deletedId,
    setDeletedId,
  } = props;
  setLoading(true);
  try {
    const response = await Api.deleteUser(deletedId, token);
    if (response && response.status === 200) {
      let obtainUserList = null;
      obtainUserList = userList.filter((item) => item._id !== deletedId);
      setUserList(obtainUserList);
      setLoading(false);
      setDeleteModal(false);
      setDeletedId(null);
    }
  } catch (e) {
    setLoading(false);
    setDeleteModal(false);
    setDeletedId(null);
    setError("Couldnot delete transaction!");
  }
};

/**
 * Get user transactions
 * @param {*} props
 */
const handleFetchTransactions = async (props) => {
  const { user, token, setUserList, setError } = props;
  try {
    const response = await Api.getUserTransactions(token, user._id);
    if (response && response.isSuccess) {
      setError(null);
      setUserList(response.data);
    } else {
      setError("Something went wrong! Could not fetch transactions.");
    }
  } catch (e) {
    setError("Something went wrong!");
  }
};

/**
 * Get all user
 * @param {*} props
 */
const handleFetchAllUsers = async (
  setUserList,
  setLoading,
  setError,
  token
) => {
  try {
    const response = await Api.getAllUsers(token);
    setError(null);
    if (response && response.isSuccess) {
      let obtainResponse =
        response && response.newData.filter((item) => item.role === 1);
      setUserList(obtainResponse);
      setError(null);
      setLoading(false);
    } else {
      setLoading(false);
      setError("Something went wrong! Could not fetch transactions.");
    }
  } catch (e) {
    setLoading(false);
    setError("Something went wrong!");
  }
};
