import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "../../Pages/User/UserMedGuide/LoginSignup/Signup";
import Login from "../../Pages/User/UserMedGuide/LoginSignup/Login";
import Verify from "../../Pages/User/UserMedGuide/LoginSignup/Verify";
import NotFound from "../../Pages/NotFound";

const AuthRoute = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup/verify/:emailId" element={<Verify />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AuthRoute;
