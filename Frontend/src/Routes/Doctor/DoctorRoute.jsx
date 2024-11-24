import React from "react";
import DoctorAuthRoute from "../Private/Doctor/DoctorAuthRoute";
import HomeDoctor from "../../Pages/Doctor/HomeDoctor/HomeDoctor";
import { Route, Routes } from "react-router-dom";
import NotFound from "../../Pages/NotFound";
import DoctorSignup from "../../Pages/Doctor/AuthPage/DoctorSignup";
import DoctorVerify from "../../Pages/Doctor/AuthPage/DoctorVerify";
import DoctorProtectRoute from "../Private/Doctor/DoctorProtectRoute";
import DoctorLogin from "../../Pages/Doctor/AuthPage/DoctorLogin";
import GlobalDoctorInfo from "../../Pages/Doctor/DoctorInfo/GlobalDoctorInfo";

const DoctorRoute = () => {
  return (
    <Routes>
      <Route element={<DoctorProtectRoute />}>
        <Route path="/" element={<HomeDoctor />} />
        <Route path="/doctor-info" element={<GlobalDoctorInfo />} />
      </Route>

      <Route element={<DoctorAuthRoute />}>
        <Route path="/auth/login" element={<DoctorLogin />} />
        <Route path="/auth/signup" element={<DoctorSignup />} />
        <Route path="/auth/signup/verify/:emailId" element={<DoctorVerify />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default DoctorRoute;
