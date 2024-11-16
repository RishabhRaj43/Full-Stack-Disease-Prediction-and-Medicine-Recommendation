import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import NotFound from "./Pages/NotFound";
import { Toaster } from "react-hot-toast";
import Footer from "./Pages/User/UserMedGuide/NavFoot/Footer";
import Navbar from "./Pages/User/UserMedGuide/NavFoot/Navbar";
import UserRoute from "./Routes/User/UserRoute";
import DoctorRoute from "./Routes/Doctor/DoctorRoute";

const App = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const pathArray = ["/user/features/chat-with-doctor"];
  return (
    <>
      {!pathArray.some((allowedPath) =>
        currentPath.startsWith(allowedPath)
      ) && <Navbar />}
      <Toaster />
      <Routes>
        <Route path="/user/*" element={<UserRoute />} />
        <Route path="/doctor/*" element={<DoctorRoute />} />

        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!pathArray.some((path) => currentPath.startsWith(path)) && <Footer />}
    </>
  );
};

export default App;
