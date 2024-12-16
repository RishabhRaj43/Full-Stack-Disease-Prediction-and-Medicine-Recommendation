import React from "react";
import { motion } from "framer-motion";
import { FaCalendarCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SimpleSlider() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="lg:text-7xl sm:text-5xl font-bold text-[#B1F0F7] mb-6"
        >
          Your Health, Our Priority
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="lg:text-lg font-semibold sm:text-xl text-gray-700 mb-8 max-w-2xl mx-auto"
        >
          Empowering you to take control of your health with ease. Book your
          doctor's appointments in just a few clicks and get the care you
          deserve.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
        >
          <Link
            to="/book-appointment"
            className="inline-flex items-center px-6 py-2 bg-yellow-500 text-black font-semibold rounded-lg text-lg hover:bg-yellow-400 transition-all"
          >
            <FaCalendarCheck className="mr-2" />
            Book Appointment
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
