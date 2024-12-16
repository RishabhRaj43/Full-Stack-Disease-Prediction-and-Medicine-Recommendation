import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import CreateAppointmentModal from "./CreateAppointmentmodal";

const MainModal = ({ doctorInfo, openModal, setOpenModal }) => {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleCreateBooking = () => {
    setOpenCreateModal(true);
  };

  const handleProfile = () => {
    navigate(`/doctor-profile/${doctorInfo._id}`);
  };

  return (
    openModal && (
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-gradient-to-r from-blue-100 via-gray-100 to-pink-100 p-8 rounded-lg w-[95%] sm:w-[80%] md:w-[500px] text-center relative shadow-xl"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
        >
          <button
            className="absolute top-3 right-3 text-2xl text-gray-600 hover:text-red-500 transition-colors"
            onClick={handleClose}
          >
            <IoClose size={30} />
          </button>

          <motion.div className="doctor-info mb-6 flex flex-col items-center">
            <img
              src={doctorInfo.profilePhoto}
              alt={doctorInfo.username}
              className="w-32 h-32 rounded-full mb-4 shadow-lg object-cover"
            />
            <h2 className="text-2xl font-semibold text-gray-800">{doctorInfo.username}</h2>
            <p className="text-sm text-gray-600 mt-1">{doctorInfo.experience} years of experience</p>
            <p className="text-lg font-semibold text-gray-800 mt-2">₹{doctorInfo.fees}</p>
          </motion.div>

          <motion.div className="doctor-details mb-6 text-left text-gray-700">
            <p className="text-md">
              <strong>Specialization:</strong> {doctorInfo.specialization.join(", ")}
            </p>
            <p className="text-md mt-2">
              <strong>Gender:</strong> {doctorInfo.gender}
            </p>
            <p className="text-md mt-2">
              <strong>Availability:</strong> {doctorInfo.availability.join(", ")}
            </p>
          </motion.div>

          <div className="flex justify-between gap-4 mt-6">
            <motion.button
              className="bg-teal-500 text-white py-2 px-6 rounded-md hover:bg-teal-600 transition"
              onClick={handleCreateBooking}
            >
              Create Booking
            </motion.button>

            <motion.button
              className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition"
              onClick={handleProfile}
            >
              View Profile
            </motion.button>
          </div>
        </motion.div>

        {openCreateModal && (
          <CreateAppointmentModal
            doctorInfo={doctorInfo}
            setOpenCreateModal={setOpenCreateModal}
            openModal={openCreateModal}
            setOpenModal={setOpenModal}
          />
        )}
      </motion.div>
    )
  );
};

export default MainModal;
