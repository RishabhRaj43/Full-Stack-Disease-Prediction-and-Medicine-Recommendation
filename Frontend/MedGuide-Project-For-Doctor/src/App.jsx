import React from "react";
import { Route, Routes } from "react-router-dom";
import DoctorAuthRoute from "./Private/DoctorAuthRoute";
import DoctorProtectRoute from "./Private/DoctorProtectRoute";
import HomeDoctor from "./Pages/HomeDoctor/HomeDoctor";
import GlobalDoctorInfo from "./Pages/DoctorInfo/GlobalDoctorInfo";
import DoctorSignup from "./Pages/Auth/DoctorSignup";
import DoctorLogin from "./Pages/Auth/DoctorLogin";
import DoctorVerify from "./Pages/Auth/DoctorVerify";
import NotFound from "./Pages/NotFound";

const App = () => {
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

export default App;
