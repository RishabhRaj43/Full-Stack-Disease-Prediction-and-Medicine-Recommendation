import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import {
  cancelAppointment,
  getAllAppointments,
} from "../../../../../Services/User/DoctorManagement/Appointment/Appointment";
import {
  likeADoctor,
  unlikeADoctor,
} from "../../../../../Services/User/DoctorManagement/DoctorsInfo/DoctorInfo";

const CurrUserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointments, setNewAppointments] = useState([]);
  const [userId, setUserId] = useState(null);
  const [category, setCategory] = useState(null);
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
    const fetchAppointments = async () => {
      try {
        const { res, userId } = await getAllAppointments(
          category,
          new Date().toLocaleString()
        );
        setUserId(userId);
        setNewAppointments(res.data.appointments);
        setAppointments(res.data.appointments);
      } catch (error) {
        console.log("Error in fetchAppointments: ", error);
        toast.error(error.response.data.message);
      }
    };
    fetchAppointments();
  }, [category]);

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
    <div className="spcae-y-2 mt-20 mb-10 flex flex-col">
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
              className="mr-2"
            />
            <label htmlFor={cat} className="text-sm text-gray-800">
              {cat}
            </label>
          </div>
        ))}
        <button
          onClick={() => setCategory(null)}
          className="text-gray-800 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Clear Filter
        </button>
      </div>

      <div className="space-y-4 pr-4">
        {newAppointments?.map(
          (appointment) => (
            console.log(
              "Timing: ",
              new Date().toLocaleString() > appointment?.start
            ),
            (
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
                          onClick={() =>
                            cancelCurrentAppointment(appointment._id)
                          }
                        >
                          <FontAwesomeIcon icon={faTrashCan} size="lg" />
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
            )
          )
        )}
      </div>
    </div>
  );
};

export default CurrUserAppointments;
