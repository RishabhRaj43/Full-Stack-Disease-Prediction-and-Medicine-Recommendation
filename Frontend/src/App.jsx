import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Components/Pages/NavFoot/Navbar";
import Home from "./Components/Pages/Home/Home";
import Signup from "./Components/Pages/LoginSignup/Signup";
import Login from "./Components/Pages/LoginSignup/Login";
import NotFound from "./Components/Pages/NotFound";
import { Toaster } from "react-hot-toast";
import Footer from "./Components/Pages/NavFoot/Footer";
import Prediction from "./Components/Pages/Prediction/Prediction";
import Chatbot from "./Components/Pages/Chatbot/Chatbot";
import ChatComponent from "./Components/Pages/Chatbot/ChatComponent";
import AuthRoute from "./Routes/AuthRoute";
import Verify from "./Components/Pages/LoginSignup/Verify";
import ProtectedRoute from "./Routes/ProtectedRoute";

const App = () => {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* login and signup routes */}
        <Route element={<AuthRoute />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup/verify/:emailId" element={<Verify />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/chat-with-ai" element={<Chatbot />} />
        </Route>

        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/chat-with-ai" && <ChatComponent />}
      <Footer />
    </>
  );
};

export default App;
