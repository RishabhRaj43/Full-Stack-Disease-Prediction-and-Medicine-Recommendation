import React from "react";
import { motion } from "framer-motion";
import ShowDoctors from "./BookAppoinmentsFolder/ShowDoctors";
import Category from "./BookAppoinmentsFolder/Category";

const Book_Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 text-white py-10 px-6">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold text-center mb-12"
      >
        Book Appointments
      </motion.h1>
      <div className="flex gap-8 justify-between">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/3 bg-white rounded-xl shadow-lg p-6 space-y-6"
        >
          <Category />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-2/3 bg-white rounded-xl shadow-lg p-6 space-y-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Available Doctors
          </h2>
          <ShowDoctors />
        </motion.div>
      </div>
    </div>
  );
};

export default Book_Home;
