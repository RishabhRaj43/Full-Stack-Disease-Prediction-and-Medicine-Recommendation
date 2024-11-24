import React, { useEffect, useState } from "react";
import { getDoctorInfo } from "../../../Services/Doctor/Auth/DoctorAuth";
import toast from "react-hot-toast";
import DoctorInfoGuide from "./DoctorInfoGuide/DoctorInfoGuide";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import DoctorInfo from "./DoctorInfoElements/DoctorInfo";
import DoctorAppointments from "./DoctorInfoElements/DoctorAppointments";
import DoctorPost from "./DoctorInfoElements/DoctorPost";

const GlobalDoctorInfo = () => {
  const [doctor, setDoctor] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    gender: "",
    specialization: [],
    experience: "",
    fees: "",
    availability: [],
    profilePhoto: "",
    appointments: [],
    posts: [],
  });

  const [tabSelected, setTabSelected] = useState("info");

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const res = await getDoctorInfo();

        setDoctor(res.data.doctor);
      } catch (error) {
        console.error("Error fetching doctor info:", error);
        toast.error(error?.response?.data?.message);
      }
    };

    fetchDoctorInfo();
  }, []);

  return (
    <div className="flex relative flex-col w-full">
      {" "}
      <div className=" flex mt-2 items-center justify-between">
        <h1 className="text-7xl  font-bold text-center text-gray-800">
          {tabSelected === "info" && "Personal Info"}
          {tabSelected === "appointments" && "Appointments"}
          {tabSelected === "posts" && "Posts"}
        </h1>
        <Link to={"/doctor"}>
          <motion.div
            className="flex justify-center mr-5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
              Back to Dashboard
            </button>
          </motion.div>
        </Link>
      </div>
      {/* Doctor Info Guide */}
      <div>
        <div>
          <DoctorInfoGuide setTabSelected={setTabSelected} />
        </div>
        <div className="mt-6 flex justify-center bg-gray-200 rounded-3xl">
          {tabSelected === "info" && (
            <DoctorInfo setDoctor={setDoctor} doctor={doctor} />
          )}
          {tabSelected === "appointments" && (
            <DoctorAppointments doctor={doctor} />
          )}
          {tabSelected === "posts" && <DoctorPost doctor={doctor} />}
        </div>
      </div>
    </div>
  );
};

export default GlobalDoctorInfo;
