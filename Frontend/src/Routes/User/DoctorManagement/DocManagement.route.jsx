import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../../Pages/User/ChatWithDoctor/Home/Home";
import Navbar from "../../../Pages/User/ChatWithDoctor/NavFoot/Navbar";
import Footer from "../../../Pages/User/ChatWithDoctor/NavFoot/Footer";
import MainCurrUserInfo from "../../../Pages/User/ChatWithDoctor/CurrUserInfo/MainCurrUserInfo";
import MainBookAppointments from "../../../Pages/User/ChatWithDoctor/BookAppointments/MainBookAppointments";
import ChatwithDoctor from "../../../Pages/User/ChatWithDoctor/ChatwithDoctor/ChatwithDoctor";

const DocManagementRoute = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-info" element={<MainCurrUserInfo />} />
        <Route path="/book-appointments" element={<MainBookAppointments />} />
        <Route
          path="/:doctorId"
          element={<ChatwithDoctor />}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default DocManagementRoute;
