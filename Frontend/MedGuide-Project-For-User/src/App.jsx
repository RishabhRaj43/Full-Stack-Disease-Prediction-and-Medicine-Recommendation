import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ProtectRoute from "./Private/ProtectRoute";
import DoctorProfile from "./Pages/DoctorProfileFol/DoctorPRofile";
import MainCurrUserInfo from "./Pages/CurrUserInfo/MainCurrUserInfo";
import Navbar from "./Pages/NavFoot/Navbar";
import Footer from "./Pages/NavFoot/Footer";
import Book_Home from "./Pages/BookAppointments/Book_Home.jsx";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<ProtectRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/doctor-appointment" element={<Book_Home />} />
          <Route path="/doctor-profile/:id" element={<DoctorProfile />} />
          <Route path="/profile" element={<MainCurrUserInfo />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
