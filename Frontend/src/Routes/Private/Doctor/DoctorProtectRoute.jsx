import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const DoctorProtectRoute = () => {
  if (!localStorage.getItem("token_doctor")) {
    return <Navigate to="/doctor/auth/login" />;
  }
  return <Outlet />;
};

export default DoctorProtectRoute;
