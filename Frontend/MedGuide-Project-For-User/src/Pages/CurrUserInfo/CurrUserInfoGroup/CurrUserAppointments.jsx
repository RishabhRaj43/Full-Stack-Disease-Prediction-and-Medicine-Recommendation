import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaTrashAlt } from "react-icons/fa";
import {
  cancelAppointment,
  getAllAppointments,
} from "../../../Apis/DoctorManagement/Appointment/Appointment";
import {
  likeADoctor,
  unlikeADoctor,
} from "../../../Apis/DoctorManagement/DoctorsInfo/DoctorInfo";
import { Link } from "react-router-dom";

const CurrUserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointments, setNewAppointments] = useState([]);
  const [userId, setUserId] = useState(null);
  const [category, setCategory] = useState(null);
  const [limit, setLimit] = useState(5);
  const [totalAppointmentsLength, setTotalAppointmentsLength] = useState(0);
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const categoryData = ["booked", "cancelled", "completed"];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { res, userId } = await getAllAppointments(
          category,
          limit,
          new Date().toLocaleString()
        );
        setUserId(userId);
        setNewAppointments(res.data.appointments);
        setAppointments(res.data.appointments);
        setTotalAppointmentsLength(res.data.totalAppointmentsLength);
      } catch (error) {
        console.log("Error in fetchAppointments: ", error);
        toast.error(error.response.data.message);
      }
    };
    fetchAppointments();
  }, [category, limit]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleToggleLike = async (doctorId, isLiked) => {
    try {
      const { res, userId } = isLiked
        ? await unlikeADoctor(doctorId)
        : await likeADoctor(doctorId);

      setNewAppointments((prev) =>
        prev.map((prevAppointment) => {
          if (prevAppointment.doctorId._id === doctorId) {
            return {
              ...prevAppointment,
              doctorId: {
                ...prevAppointment.doctorId,
                likedBy: res.data.likes,
              },
            };
          }
          return prevAppointment;
        })
      );

      toast.success(res.data.message);
    } catch (error) {
      console.log("Error in handleToggleLike: ", error);
      toast.error(error.response.data.message);
    }
  };

  const cancelCurrentAppointment = async (appointmentId) => {
    try {
      const res = await cancelAppointment(appointmentId);
      setNewAppointments((prev) => {
        return prev.map((prevAppointment) => {
          if (prevAppointment._id === appointmentId) {
            return {
              ...prevAppointment,
              status: "cancelled",
            };
          }
          return prevAppointment;
        });
      });
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error in cancelCurrentAppointment: ", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="spcae-y-2  mb-10 flex flex-col">
      <h1 className="text-5xl mb-4 font-bold">Appointments </h1>
      <hr className="border-t-2  border-gray-700 my-4 hover:opacity-100 transition-opacity duration-300 mr-5" />
      <div className="flex gap-5 mb-6">
        {categoryData?.map((cat, index) => (
          <div key={index} className="flex items-center">
            <input
              type="radio"
              id={cat}
              name="category"
              value={cat}
              checked={category === cat}
              onChange={handleCategoryChange}
              className="hidden peer"
            />

            <label
              htmlFor={cat}
              className="flex items-center cursor-pointer space-x-2 text-lg"
            >
              <motion.span
                className="w-5 h-5 rounded-full border-2 border-teal-600 flex items-center justify-center mr-2 transition-colors duration-300 ease-in-out relative peer-checked:bg-teal-600 peer-checked:border-teal-600 peer-hover:bg-teal-500"
                initial={{ scale: 1 }}
                whileTap={{ scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  className="w-3 h-3 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: category === cat ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.span>
              <span className="text-gray-800 font-medium">{cat}</span>
            </label>
          </div>
        ))}
        <button
          onClick={() => setCategory(null)}
          className="text-gray-800 bg-white border border-gray-300 hover:bg-gray-100 focus:none focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Clear Filter
        </button>
      </div>

      <div className="space-y-4 pr-4">
        {newAppointments?.map((appointment) => (
          <div
            className="flex flex-col md:flex-row justify-between rounded-xl p-5 bg-gray-300 items-center shadow-md space-y-4 md:space-y-0 md:space-x-6"
            key={appointment._id}
          >
            <div className="flex space-x-4 items-center">
              <img
                src={appointment.doctorId.profilePhoto}
                alt="Profile"
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <Link
                  to={`/doctor-profile/${appointment.doctorId._id}`}
                  className="hover:underline"
                >
                  <h2 className="text-2xl font-semibold">
                    {appointment.doctorId.username}
                  </h2>
                </Link>
                <p className="text-gray-800 text-sm">
                  <span className="font-semibold">Booking Status : </span>
                  {appointment.status}
                </p>
                <p className="text-gray-800 text-xs">
                  <span className="font-semibold">Start : </span>{" "}
                  {new Date(appointment.start).toLocaleString(
                    "en-US",
                    dateOptions
                  )}
                </p>
                <p className="text-gray-800 text-xs">
                  <span className="font-semibold">End : </span>{" "}
                  {new Date(appointment?.end).toLocaleString(
                    "en-US",
                    dateOptions
                  )}
                </p>
              </div>
            </div>
            <div>
              <div className="flex gap-2">
                <div>
                  {appointment.status === "booked" && (
                    <div
                      className="bg-red-500 p-2 flex justify-center rounded-xl w-9 h-9 items-center hover:bg-red-600 cursor-pointer"
                      onClick={() => cancelCurrentAppointment(appointment._id)}
                    >
                      <FaTrashAlt size="1.5em" />
                    </div>
                  )}
                </div>
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() =>
                    handleToggleLike(
                      appointment?.doctorId._id,
                      appointment?.doctorId?.likedBy?.includes(userId)
                    )
                  }
                >
                  <img
                    src={
                      appointment?.doctorId?.likedBy?.includes(userId)
                        ? "/like-solid.svg"
                        : "/like-regular.svg"
                    }
                    className="w-6 h-auto"
                    alt="Like icon"
                  />
                  <p className=" font-semibold">
                    {appointment?.doctorId?.likedBy?.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {totalAppointmentsLength !== 0 &&
        totalAppointmentsLength > appointments.length &&
        (console.log("Total Appointments Length: ", totalAppointmentsLength),
        (
          <div className="flex justify-center mt-4">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
              onClick={() => setLimit(limit + 5)}
            >
              Load More
            </button>
          </div>
        ))}

      {totalAppointmentsLength === 0 && (
        <div className="flex w-full h-full flex-col justify-center items-center rounded-xl p-5 bg-gray-300 shadow-md">
          <p className="text-gray-800 text-center text-lg font-semibold">No Appointments Found</p>
        </div>
      )}
    </div>
  );
};

export default CurrUserAppointments;
