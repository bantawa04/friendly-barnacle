/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

// custom component
import AddAccount from "../../atoms/AddAccount/AddAccount";
import EditAccount from "../../atoms/EditAccount/EditAccount";
import Share from "../../atoms/ShareModal/Share";
import useLocalStorage from "../../../common/useLocalStorage";

// material-ui
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";

// icons
import Delete from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

// css *required
import { useStyles } from "./AccountTable.css";
import Api from "../../../common/Api";
import { Typography } from "@material-ui/core";

//===================================================
// 1.Main Component
//===================================================
const AccountSetting = (props) => {
  // 1-1. useStyles *require
  const classes = useStyles();

  // 1-2. Store
  const [accountList, setAccountList] = useLocalStorage("account", []);
  const [user] = useLocalStorage("user", {});
  const [token] = useLocalStorage("token", null);

  const [addListModal, setAddListModal] = useState(false);
  const [editListModal, setEditListModal] = useState({
    isVisible: false,
    data: null,
    index: null,
  });
  const [share, setShare] = useState({
    isVisible: false,
    data: null,
  });
  const [loading, setLoading] = useState(false);
  const [transactionError, setError] = useState(null);

  // 1-3. api
  useEffect(() => {
    handleFetchTransactions({
      user,
      token,
      setError,
      setAccountList,
    });
  }, []);

  // 1-4. useEffect

  // showMain
  return showMain({
    ...props,
    classes,
    addListModal,
    setAddListModal,
    accountList,
    setAccountList,
    loading,
    setLoading,
    editListModal,
    setEditListModal,
    share,
    setShare,
    user,
    token,
    transactionError,
    setError,
    tableHeader: user?.tableHeaders,
  });
};

//===================================================
// 2.Export
//===================================================
export default AccountSetting;

//===================================================
// 3.propTypes and defaultProps
//===================================================

//3-1. propTypes
AccountSetting.propTypes = {};

//3-2. defaultProps
AccountSetting.defaultProps = {};

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
    addListModal,
    setAddListModal,
    editListModal,
    setEditListModal,
    share,
    setShare,
    transactionError,
    accountList,
    loading,
    tableHeader,
  } = props;
  return (
    <div className={classes.root}>
      <div className={classes.shareButtonRow}>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => setAddListModal(!addListModal)}
        >
          Add
        </Button>
      </div>
      <Typography style={{ color: "red" }}>{transactionError}</Typography>
      <TableContainer className={classes.tableContainer}>
        <Table
          stickyHeader
          className={classes.table}
          aria-label="account-setting-table"
        >
          {showTableHead(props)}
          {showTableBody(props)}
        </Table>
      </TableContainer>
      {accountList.length > 0 && (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.shareButton}
          onClick={() => handleOpenShare(props)}
        >
          Submit
        </Button>
      )}
      {addListModal && (
        <AddAccount
          isLoading={loading}
          open={addListModal}
          tableHeader={tableHeader}
          onCloseAddListModal={() => setAddListModal(!addListModal)}
          addAccountList={(data) => handleAddList(data, props)}
        />
      )}

      {editListModal.isVisible && (
        <EditAccount
          isLoading={loading}
          tableHeader={tableHeader}
          open={editListModal.isVisible}
          editData={editListModal.data}
          onCloseEditListModal={() =>
            setEditListModal({ isVisible: false, index: null })
          }
          updateAccountList={(data) => handleUpdatedList(data, props)}
        />
      )}
      {share.isVisible && (
        <Share
          open={share.isVisible}
          data={share.data}
          handleCreatePdf={() => handleCreatePdf(props)}
          onCloseShareModal={() => setShare({ isVisible: false, data: null })}
        />
      )}
    </div>
  );
};

/**
 * display table header
 * @param {*} props
 * @returns
 */
const showTableHead = (props) => {
  const { classes, tableHeader } = props;
  return (
    <TableHead>
      <TableRow>
        <TableCell className={classes.tableHeadCell}>ID</TableCell>
        <TableCell className={classes.tableHeadCell}>
          {tableHeader?.mValue || "M"}
        </TableCell>
        <TableCell className={classes.tableHeadCell}>
          {tableHeader?.kValue || "K"}
        </TableCell>
        <TableCell className={classes.tableHeadCell}>
          {tableHeader?.sValue || "S"}
        </TableCell>
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
  const { classes, accountList, loading, setEditListModal } = props;
  if (!accountList) {
    return (
      <TableBody>
        <TableRow>
          <TableCell
            className={classes.tableBodyCell + "" + classes.emptyTableList}
            colSpan={5}
          >
            No data Found.
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }
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
  return (
    <TableBody>
      {accountList.length > 0 &&
        accountList.map((list, index) => {
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
                {list.mValue}
              </TableCell>
              <TableCell
                className={
                  classes.tableBodyCell + " " + classes.innerTableBodyCell
                }
              >
                {list.kValue}
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
                {list.sValue}
              </TableCell>
              <TableCell className={classes.tableBodyCell} align="center">
                <IconButton
                  aria-label="List-list-edit row"
                  size="small"
                  onClick={() =>
                    setEditListModal({
                      isVisible: true,
                      data: list,
                      index: index,
                    })
                  }
                >
                  <EditIcon htmlColor="#3f51b5" />
                </IconButton>
                <IconButton
                  aria-label="List-list-delete row"
                  size="small"
                  onClick={() => onDeletedClicked(list._id, props)}
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
/**
 * delete account list
 * @param {*} params
 */
const onDeletedClicked = async (id, props) => {
  const { accountList, setAccountList, setLoading, token, setError } = props;
  setLoading(true);
  try {
    const response = await Api.deleteTransaction(id, token);
    if (response && response.status === 200) {
      let obtainAccountList = null;
      obtainAccountList = accountList.filter((item) => item._id !== id);
      setAccountList(obtainAccountList);
      setLoading(false);
    }
  } catch (e) {
    setLoading(false);
    setError("Couldnot delete transaction!");
  }
};

/**
 * add List data
 * @param {*} data
 * @param {*} props
 */
const handleAddList = async (data, props) => {
  const {
    addListModal,
    setAddListModal,
    accountList,
    setAccountList,
    setLoading,
    user,
    token,
    setError,
  } = props;
  let obtainAccountList = accountList || [];
  setLoading(true);
  const { M, K, S } = data;
  try {
    const response = await Api.createTransaction(
      {
        mValue: M,
        kValue: K,
        sValue: S,
        userId: user._id,
      },
      token
    );
    if (response && response.status === 200) {
      setAccountList([...obtainAccountList, response.data.data]);
    } else {
      const errorMsg = response.data;
      if (typeof errorMsg !== "string") {
        setError(errorMsg[0].message);
      } else {
        setError(errorMsg);
      }
    }
    setAddListModal(!addListModal);
    setLoading(false);
  } catch (e) {
    console.log(e);
    setLoading(false);
    setError("Something went wrong!");
  }
};

/**
 * edit/update List data
 * @param {*} data
 * @param {*} props
 */
const handleUpdatedList = async (data, props) => {
  const {
    setEditListModal,
    accountList,
    setAccountList,
    setLoading,
    user,
    token,
    setError,
  } = props;
  setLoading(true);
  const { M, K, S, _id } = data;
  try {
    const response = await Api.updateTransaction(
      {
        mValue: M,
        kValue: K,
        sValue: S,
        userId: user._id,
        transactionId: _id,
      },
      token
    );
    if (response && response.status === 200) {
      const remainingList = accountList.filter((item) => item._id !== _id);
      setAccountList([response.data.data, ...remainingList]);
    } else {
      const errorMsg = response.data;
      if (typeof errorMsg !== "string") {
        setError(errorMsg[0].message);
      } else {
        setError(errorMsg);
      }
    }
    setEditListModal({
      isVisible: false,
      data: null,
      index: null,
    });
    setLoading(false);
  } catch (e) {
    setLoading(false);
    setError("Something went wrong!");
  }
};

/**
 * Get user transactions
 * @param {*} props
 */
const handleFetchTransactions = async (props) => {
  const { user, token, setAccountList, setError } = props;
  try {
    const response = await Api.getUserTransactions(token, user._id);
    if (response && response.isSuccess) {
      setError(null);
      setAccountList(response.data);
    } else {
      setError("Something went wrong! Could not fetch transactions.");
    }
  } catch (e) {
    setError("Something went wrong!");
  }
};

/**
 * Submit transactions
 * @param {*} props
 */
const handleCreatePdf = async (props) => {
  const { token, accountList, setAccountList, setError, setShare } = props;
  try {
    const transIds = accountList.map((item) => item._id);
    const response = await Api.submitTransaction({ transIds }, token);
    if (response && response.status === 200 && response.data.isSuccess) {
      setAccountList([]);
      setShare({ isVisible: false, data: null });
    } else {
      setError("Could not submit transactions!");
    }
  } catch (e) {
    setError("Generate pdf failed!");
  }
};

/**
 * Open share modal
 * @param {*} props
 */
const handleOpenShare = (props) => {
  const { setShare, accountList, setError, user } = props;
  if (accountList && accountList.length > 0) {
    let mTotal = 0;
    let kTotal = 0;
    let sTotal = 0;
    accountList.forEach((item) => {
      mTotal += item.mValue;
      kTotal += item.kValue;
      sTotal += item.sValue;
    });
    setShare({
      isVisible: true,
      data: {
        mTotal,
        kTotal,
        sTotal,
        accountList,
        user,
      },
    });
  } else {
    setError("Nothing to share!");
  }
};
