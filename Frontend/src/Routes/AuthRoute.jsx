import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  if (localStorage.getItem("user")) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default AuthRoute;
