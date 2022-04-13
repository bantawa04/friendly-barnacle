import React from "react";

//custom components
import Dashboard from "../../templates/Dashboard/Dashboard";
import UserTable from "../../molecules/UserTable/UserTable";

// css *required
import { useStyles } from "./User.css";

//===================================================
// 1.Main Component
//===================================================
const UserPage = (props) => {
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
export default UserPage;

//===================================================
// 3.propTypes and defaultProps
//===================================================

//3-1. propTypes
UserPage.propTypes = {};

//3-2. defaultProps
UserPage.defaultProps = {};

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
      <UserTable />
    </Dashboard>
  );
};

//===================================================
// 5.Actions
//===================================================
