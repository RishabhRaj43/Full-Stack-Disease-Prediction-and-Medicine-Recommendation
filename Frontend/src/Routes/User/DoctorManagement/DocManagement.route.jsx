import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../../Pages/User/ChatWithDoctor/Home/Home";
import Navbar from "../../../Pages/User/ChatWithDoctor/NavFoot/Navbar";
import Footer from "../../../Pages/User/ChatWithDoctor/NavFoot/Footer";

const DocManagementRoute = () => {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
};

export default DocManagementRoute;
