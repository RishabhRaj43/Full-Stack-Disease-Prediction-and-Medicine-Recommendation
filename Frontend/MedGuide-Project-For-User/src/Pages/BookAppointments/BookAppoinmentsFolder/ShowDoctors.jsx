import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import CreateAppointmentModal from "./Doctors/CreateAppointmentmodal";
import { getAllDoctors } from "../../../Apis/DoctorManagement/DoctorsInfo/DoctorInfo";
import MainModal from "./Doctors/MainModal";

const ShowDoctors = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [doctorInfo, setDoctorInfo] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchDoctor = async () => {
      const categories = searchParams.get("categories");
      const { res } = await getAllDoctors(categories || null);
      setDoctorInfo(res.data.doctors);
      setFilteredDoctors(res.data.doctors);
    };
    fetchDoctor();
  }, [searchParams]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    const filtered = doctorInfo.filter((doctor) =>
      doctor.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDoctors(filtered);
  };

  const handleBook = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setOpenModal(!openModal);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-100 rounded-3xl mb-10 p-6 overflow-y-auto">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by doctor name"
          value={search}
          onChange={handleSearch}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-black"
        />
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredDoctors
          ?.sort((a, b) => a.username.localeCompare(b.username))
          ?.map((doctor) => (
            <motion.div
              key={doctor._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg p-6 flex flex-col items-center justify-between hover:shadow-lg transition-all"
            >
              <img
                src={doctor.profilePhoto}
                alt={doctor.username}
                className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-indigo-600"
              />

              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {doctor.username}
              </h2>

              <button
                onClick={() => handleBook(doctor._id)}
                className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-md hover:bg-gradient-to-l hover:from-indigo-600 hover:to-blue-600 transition-all"
              >
                Book
              </button>

              {openModal && selectedDoctorId === doctor._id && (
                <MainModal
                  doctorInfo={doctor}
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                />
              )}
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
};

export default ShowDoctors;
