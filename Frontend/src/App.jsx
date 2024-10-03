import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Pages/NavFoot/Navbar";
import Home from "./Components/Pages/Home/Home";
import Signup from "./Components/Pages/LoginSignup/Signup";
import Login from "./Components/Pages/LoginSignup/Login";
import NotFound from "./Components/Pages/NotFound";
import { Toaster } from "react-hot-toast";
import Footer from "./Components/Pages/NavFoot/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        { /* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
