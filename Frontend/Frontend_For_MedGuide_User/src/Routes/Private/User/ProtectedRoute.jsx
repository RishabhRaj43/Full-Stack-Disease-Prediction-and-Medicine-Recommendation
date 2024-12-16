import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  if (!localStorage.getItem("token_user")) {
    return <Navigate to="/user/auth/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
