import React from "react";

//custom components
import Dashboard from "../../templates/Dashboard/Dashboard";
import AccountTable from "../../molecules/AccountTable/AccountTable";

// css *required
import { useStyles } from "./DashBoard.css";

//===================================================
// 1.Main Component
//===================================================
const DashBoard = (props) => {
  // 1-1. useStyles *require
  const classes = useStyles();

  // 1-2. Store

  // 1-3. useQuery, Mutation

  // showMain
  return showMain({
    ...props,
  });
};
//===================================================
// 2.Export
//===================================================
export default DashBoard;

//===================================================
// 3.propTypes and defaultProps
//===================================================

//3-1. propTypes
DashBoard.propTypes = {};

//3-2. defaultProps
DashBoard.defaultProps = {};

//===================================================
// 4.Functions *require showMain()
//===================================================
/**
 * Show main
 * @param {*} props
 */

const showMain = (props) => {
  return (
    <Dashboard>
      <AccountTable />
    </Dashboard>
  );
};

//===================================================
// 5.Actions
//===================================================
