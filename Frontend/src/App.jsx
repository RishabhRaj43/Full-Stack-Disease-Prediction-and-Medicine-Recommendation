import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Pages/NavFoot/Navbar";
import Home from "./Components/Pages/Home/Home";
import Signup from "./Components/Pages/LoginSignup/Signup";
import Login from "./Components/Pages/LoginSignup/Login";
import NotFound from "./Components/Pages/NotFound";
import { Toaster } from "react-hot-toast";
import Footer from "./Components/Pages/NavFoot/Footer";
import Prediction from "./Components/Pages/Prediction/Prediction";
import Chatbot from "./Components/Pages/Chatbot/Chatbot";

const App = () => {
  return (
    <>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/chat" element={<Chatbot />} />

        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
