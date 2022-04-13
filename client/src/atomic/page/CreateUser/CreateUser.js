import React from "react";

//custom components
import Dashboard from "../../templates/Dashboard/Dashboard";
import UserHistory from "../../molecules/UserHistory/UserHistory";

// css *required
import { useStyles } from "./CreateUser.css";

//===================================================
// 1.Main Component
//===================================================
const CreateUser = (props) => {
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
export default CreateUser;

//===================================================
// 3.propTypes and defaultProps
//===================================================

//3-1. propTypes
CreateUser.propTypes = {};

//3-2. defaultProps
CreateUser.defaultProps = {};

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
      <UserHistory />
    </Dashboard>
  );
};

//===================================================
// 5.Actions
//===================================================
