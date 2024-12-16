import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import NotFound from "./Pages/NotFound";
import { Toaster } from "react-hot-toast";
import Footer from "./Pages/User/UserMedGuide/NavFoot/Footer";
import Navbar from "./Pages/User/UserMedGuide/NavFoot/Navbar";
import UserRoute from "./Routes/User/UserRoute";
import GlobalHome from "./Pages/GlobalHome";

const App = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const pathArray = ["/doctor"];
  return (
    <>
       <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<GlobalHome />} />
        <Route path="/user/*" element={<UserRoute />} />
        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
