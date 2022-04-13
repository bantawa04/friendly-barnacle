import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// pages
import SignIn from "./atomic/page/SignIn/SignIn";
import Register from "./atomic/page/Register/Register";
import DashBoard from "./atomic/page/DashBoard/DashBoard";
import User from "./atomic/page/User/User";
import CreateUser from "./atomic/page/CreateUser/CreateUser";

// components
import useLocalStorage from "./common/useLocalStorage";
import PrivateRoute from "./PrivateRoute";
import TableHeaderForm from "./atomic/page/TableHeaderForm";

export const Router = () => {
  const [token] = useLocalStorage("token", null);
  const [user] = useLocalStorage("user", null);
  if (token) {
    return (
      <BrowserRouter>
        <Routes>
          {user.role === 2 && (
            <>
              <Route
                path="/register"
                element={
                  <PrivateRoute>
                    <Register />
                  </PrivateRoute>
                }
              />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <User />
                  </PrivateRoute>
                }
              />
              <Route exact path="/history" element={<CreateUser />} />
              <Route path="/*" element={<Navigate to="/" />} />
            </>
          )}
          {user.role === 1 && (
            <>
              <Route
                exact
                strict
                path="/"
                element={
                  <PrivateRoute>
                    <DashBoard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/tableHeader"
                element={
                  <PrivateRoute>
                    <TableHeaderForm />
                  </PrivateRoute>
                }
              />
              <Route path="/*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/*" element={<Navigate to="/signin" />} />
      </Routes>
    </BrowserRouter>
  );
};
