import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllAppointments } from "../../../../../Services/User/DoctorManagement/Appointment/Appointment";
import {
  likeADoctor,
  unlikeADoctor,
} from "../../../../../Services/User/DoctorManagement/DoctorsInfo/DoctorInfo";

const CurrUserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [userId, setUserId] = useState(null);
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { res, userId } = await getAllAppointments();
        setUserId(userId);
        setAppointments(res.data.appointments);
      } catch (error) {
        console.log("Error in fetchAppointments: ", error);
        toast.error(error.response.data.message);
      }
    };
    fetchAppointments();
  }, []);

  const handleToggleLike = async (doctorId, isLiked) => {
    try {
      const { res, userId } = isLiked
        ? await unlikeADoctor(doctorId)
        : await likeADoctor(doctorId);
      setAppointments((prev) => {
        return prev.map((prevAppointment) => {
          if (prevAppointment.doctorId._id === doctorId) {
            return {
              ...prevAppointment,
              doctorId: {
                ...prevAppointment.doctorId,
                likedBy: res.data.likes, // Update the 'likedBy' field
              },
            };
          }
          return prevAppointment;
        });
      });

      toast.success(res.data.message);
    } catch (error) {
      console.log("Error in handleToggleLike: ", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="spcae-y-2 mt-20 flex flex-col">
      <h1 className="text-5xl mb-4 font-bold">Appointments </h1>
      <hr className="border-t-2  border-gray-700 my-4 hover:opacity-100 transition-opacity duration-300 mr-5" />
      <div className="space-y-4 pr-4">
        {appointments?.map((appointment) => (
          <div
            className="flex justify-between rounded-xl p-3 bg-slate-400 items-center space-x-4 shadow-xl"
            key={appointment._id}
          >
            <div className="flex space-x-4 items-center">
              <img
                src={appointment.doctorId.profilePhoto}
                alt="Profile"
                className="w-14 h-14 rounded-full"
              />
              <div>
                <h2 className="text-2xl font-semibold">
                  {appointment.doctorId.username}
                </h2>
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
                  {new Date(appointment.end).toLocaleString(
                    "en-US",
                    dateOptions
                  )}
                </p>
              </div>
            </div>
            <div
              className="cursor-pointer"
              onClick={() =>
                handleToggleLike(
                  appointment.doctorId._id,
                  appointment.doctorId.likedBy.includes(userId)
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrUserAppointments;
