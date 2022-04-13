import React from "react";
import useLocalStorage from "./common/useLocalStorage";
import { Navigate } from "react-router-dom";

//===================================================
// 1.Main Component
//===================================================
const PrivateRoute = (props) => {
  const [token] = useLocalStorage("token");
  // showMain
  return token ? props.children : <Navigate to={"/signin"} />;
};
//===================================================
// 2.Export
//===================================================
export default PrivateRoute;

//===================================================
// 3.propTypes and defaultProps
//===================================================

//===================================================
// 4.Functions *require showMain()
//===================================================

//===================================================
// 5.Actions
//===================================================
