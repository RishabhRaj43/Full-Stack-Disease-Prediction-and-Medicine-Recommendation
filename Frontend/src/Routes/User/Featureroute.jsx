import React from "react";
import { Route, Routes } from "react-router-dom";
import Prediction from "../../Pages/User/UserMedGuide/Prediction/Prediction";
import Chatbot from "../../Pages/User/UserMedGuide/Chatbot/Chatbot";
import NotFound from "../../Pages/NotFound";
import DocManagementRoute from "./DoctorManagement/DocManagement.route";
import ProtectedRoute from "../Private/User/ProtectedRoute";

const Featureroute = () => {
  return (
    <Routes>
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/chat-with-ai" element={<Chatbot />} />
        <Route path="/chat-with-doctor/*" element={<DocManagementRoute />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Featureroute;
