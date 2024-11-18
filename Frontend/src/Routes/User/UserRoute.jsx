import React from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import UserAuthRoute from "../Private/User/UserAuthRoute";
import ProtectedRoute from "../Private/User/ProtectedRoute";
import AuthRoute from "./AuthRoute";
import Featureroute from "./Featureroute";
import Home from "../../Pages/User/UserMedGuide/Home/Home";
import ChatComponent from "../../Pages/User/UserMedGuide/Chatbot/ChatComponent";
import About from "../../Pages/User/UserMedGuide/About/About";
const UserRoute = () => {
  const location = useLocation();
  const auth = ["/login", "/signup", "/verify"];
  const features = ["/chat-with-doctor", "/chat-with-ai"];
  return (
    <>
      {location.pathname.startsWith("/user") &&
        !auth.some((path) =>
          location.pathname.startsWith(`/user/auth${path}`)
        ) &&
        !features.some((path) =>
          location.pathname.startsWith(`/user/features${path}`)
        ) && <ChatComponent />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route element={<UserAuthRoute />}>
          <Route path="/auth/*" element={<AuthRoute />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/features/*" element={<Featureroute />} />
        </Route>

        <Route path="/*" element={<Outlet />} />
      </Routes>
    </>
  );
};

export default UserRoute;
