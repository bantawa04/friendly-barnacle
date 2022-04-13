/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// custom component
import Api from "../../../common/Api";
import useLocalStorage from "../../../common/useLocalStorage";
import { getDateTime } from "../../../common/Utility";

// material-ui
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Container, Typography } from "@material-ui/core";

// css *required
import { useStyles } from "./UserHistory.css";

//===================================================
// 1.Main Component
//===================================================
const UserHistory = (props) => {
  // 1-1. useStyles *require
  const classes = useStyles();

  // 1-2. Store
  let location = useLocation();
  const { _id: userId, tableHeaders } = location.state;

  const [userHistoryList, setUserHistory] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token] = useLocalStorage("token", null);

  // 1-3. api
  useEffect(() => {
    handleCompletedTransactionsByUser(
      userId,
      setUserHistory,
      setLoading,
      setError,
      token
    );
  }, []);

  // 1-4. useEffect

  // showMain
  return showMain({
    ...props,
    classes,
    userHistoryList,
    setUserHistory,
    loading,
    setLoading,
    error,
    setError,
    token,
    tableHeaders,
  });
};

//===================================================
// 2.Export
//===================================================
export default UserHistory;

//===================================================
// 3.propTypes and defaultProps
//===================================================

//3-1. propTypes
UserHistory.propTypes = {};

//3-2. defaultProps
UserHistory.defaultProps = {};

//===================================================
// 4.Functions *require showMain()
//===================================================
/**
 * Show main
 * @param {*} props
 */
const showMain = (props) => {
  const { classes, userHistoryList, loading } = props;
  const historyKeys = userHistoryList && Object.keys(userHistoryList);
  if (loading) {
    return (
      <Container className={classes.container}>
        <CircularProgress size={20} />
      </Container>
    );
  }
  if (historyKeys && historyKeys.length === 0) {
    return <Typography>No data Found.</Typography>;
  }
  return (
    <div className={classes.root}>
      <TableContainer className={classes.tableContainer}>
        {historyKeys &&
          historyKeys.length > 0 &&
          historyKeys.map((key, i) => {
            const historylist = userHistoryList[key];
            let kTotal = 0;
            let sTotal = 0;
            return (
              <React.Fragment key={i}>
                <Typography>Date: {getDateTime(key)}</Typography>
                <Table
                  key={key + i}
                  stickyHeader
                  className={classes.table}
                  aria-label="user-history-table"
                >
                  {showTableHead(props)}
                  {historylist.map((list) => {
                    kTotal += list.kValue;
                    sTotal += list.sValue;
                    return showTableBody({ ...props, list });
                  })}
                  {showTableBody({
                    ...props,
                    list: {
                      mValue: <Typography>Total</Typography>,
                      kValue: kTotal,
                      sValue: sTotal,
                    },
                  })}
                </Table>
              </React.Fragment>
            );
          })}
      </TableContainer>
    </div>
  );
};

/**
 * display table header
 * @param {*} props
 * @returns
 */
const showTableHead = (props) => {
  const { classes, tableHeaders } = props;
  return (
    <TableHead>
      <TableRow>
        <TableCell className={classes.tableHeadCell}>
          {tableHeaders?.mValue ?? "M"}
        </TableCell>
        <TableCell className={classes.tableHeadCell}>
          {tableHeaders?.kValue ?? "K"}
        </TableCell>
        <TableCell className={classes.tableHeadCell}>
          {tableHeaders?.sValue ?? "S"}
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

/**
 * display table body
 */
const showTableBody = (props) => {
  const { classes, list } = props;
  return (
    <TableBody key={list._id}>
      <TableRow className={classes.table}>
        <TableCell
          className={classes.tableBodyCell + " " + classes.innerTableBodyCell}
        >
          {list.mValue}
        </TableCell>

        <TableCell
          className={classes.tableBodyCell + " " + classes.innerTableBodyCell}
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
      </TableRow>
    </TableBody>
  );
};
//===================================================
// 5.Actions
//===================================================

/**
 * Get completed transaction by user
 * @param {*} userId
 * @param {*} props
 */
const handleCompletedTransactionsByUser = async (
  userId,
  setUserHistory,
  setLoading,
  setError,
  token
) => {
  try {
    const response = await Api.getCompletedTransactionsByUser(userId, token);
    setLoading(true);
    setError(null);
    if (response && response.isSuccess) {
      setLoading(false);
      const dateList = groupByDate(response.data, "updatedAt");
      setUserHistory(dateList);
      setError(null);
    }
  } catch (e) {
    setLoading(false);
    setError("Something went wrong!");
  }
};

/**
 * Group by date
 * @param {*} input
 * @param {*} key
 * @returns
 */
const groupByDate = (input, key) => {
  return input.reduce((acc, currentValue) => {
    let groupKey = currentValue[key];
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(currentValue);
    return acc;
  }, {});
};
