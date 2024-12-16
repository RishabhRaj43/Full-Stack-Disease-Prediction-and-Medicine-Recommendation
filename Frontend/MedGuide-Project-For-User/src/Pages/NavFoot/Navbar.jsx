import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import useUserData from "../../Zustand/useUserData";
import Headroom from "react-headroom";

const Navbar = () => {
  const { user } = useUserData();

  return (
    <Headroom>
      <motion.div
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 p-4 shadow-md"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/">
            <motion.div
              className="text-white text-2xl font-semibold"
              transition={{ type: "spring", stiffness: 300 }}
            >
              MedGuide
            </motion.div>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="flex space-x-6 text-white text-lg">
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2"
              >
                <Link
                  to="/"
                  className="hover:text-gray-200 flex items-center gap-2"
                >
                  <FaHome />
                  Home
                </Link>
              </motion.div>

              <motion.div
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2"
              >
                <Link
                  to="/doctor-appointment"
                  className="hover:text-gray-200 flex items-center gap-2"
                >
                  <FaCalendarAlt />
                  Doctor Appointment
                </Link>
              </motion.div>
            </div>

            {/* User Avatar */}
            <Link to="/profile">
              <motion.div className="flex items-center">
                {user?.profilePhoto ? (
                  <motion.img
                    src={user.profilePhoto}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="text-white text-3xl" />
                )}
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.div>
    </Headroom>
  );
};

export default Navbar;
