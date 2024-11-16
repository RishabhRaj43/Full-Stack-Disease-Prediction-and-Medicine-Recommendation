import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  if (localStorage.getItem("user")) {
    return <Navigate to="/user" />;
  }
  return <Outlet />;
};

export default AuthRoute;
