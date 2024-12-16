import React, { useState } from "react";
import { motion } from "framer-motion";
import useDoctorProfile from "../../../Zustand/useDoctorProfile.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { doctorLogout } from "../../../Apis/Auth/DoctorAuth.js";

const DoctorInfoGuide = () => {
  const navigate = useNavigate();
  const { logout } = useDoctorProfile();

  const handleTabClick = (tabName) => {
    navigate(`?tab=${tabName}`);
  };

  const handleLogout = async () => {
    try {
      const res = await doctorLogout();
      logout();
      toast.success(res.data.message);
      navigate("/auth/login");
    } catch (error) {
      console.log("Error in handleLogout: ", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex space-x-6 justify-center mt-6">
      <motion.div
        className="flex items-center justify-center w-36 h-12 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full cursor-pointer shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleTabClick("info")}
      >
        <span className="font-semibold">Info</span>
      </motion.div>

      <motion.div
        className="flex items-center justify-center w-36 h-12 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-full cursor-pointer shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleTabClick("appointments")}
      >
        <span className="font-semibold">Appointments</span>
      </motion.div>

      <motion.div
        className="flex items-center justify-center w-36 h-12 bg-gradient-to-r from-yellow-500 to-yellow-700 text-white rounded-full cursor-pointer shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleTabClick("posts")}
      >
        <span className="font-semibold">Posts</span>
      </motion.div>

      <motion.div
        className="flex items-center justify-center w-36 h-12 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-full cursor-pointer shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogout}
      >
        <span className="font-semibold">Logout</span>
      </motion.div>
    </div>
  );
};

export default DoctorInfoGuide;
