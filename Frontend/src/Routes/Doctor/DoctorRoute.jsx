import React from "react";
import DoctorAuthRoute from "../Private/Doctor/DoctorAuthRoute";
import HomeDoctor from "../../Pages/Doctor/HomeDoctor/HomeDoctor";
import { Route, Routes } from "react-router-dom";
import NotFound from "../../Pages/NotFound";

const DoctorRoute = () => {
  return (
    <Routes>
      <Route element={<DoctorAuthRoute />}>
        <Route path="/" element={<HomeDoctor />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default DoctorRoute;
