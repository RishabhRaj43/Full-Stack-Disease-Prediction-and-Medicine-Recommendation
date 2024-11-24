import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { createAppointment } from "../../../../../../Services/User/DoctorManagement/Appointment/Appointment";

const Modal_Appointment = ({ closeModal, userId, doctorInfo }) => {
  const currTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const [isBook, setIsBook] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    if (isBook) {
      toast("Please select date and time");
    }
  }, [isBook]);

  const handleBookAppointment = async () => {
    if (!selectedTime || !selectedDate) {
      toast.error("Please select date and time");
      return;
    }

    const [hour, minute] = selectedTime.split(":");
    const parsedHour =
      selectedTime.includes("PM") && hour !== "12" ? +hour + 12 : +hour;
    const parsedMinute = parseInt(minute);

    // Update the `selectedDate` with the time
    const appointmentDate = new Date(selectedDate);
    appointmentDate.setHours(parsedHour, parsedMinute, 0, 0);

    console.log("currTime", appointmentDate);

    const data = {
      doctorId: doctorInfo._id,
      date: appointmentDate,
      time: selectedTime,
    };

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    try {
      // const res = await createAppointment(data);
      toast.promise(
        (async () => {
          await delay(1200);

          return createAppointment(data);
        })(),
        {
          loading: "Creating Appointment...",
          success: (data) => {
            return data.data.message;
          },
          error: (err) => {
            return err.response.data.message;
          },
        }
      );
      setTimeout(() => {
        closeModal();
      }, 1500);
    } catch (error) {
      console.log("Error in createAppointment: ", error);
      toast.error(error.response.data.message);
    }

    console.log("Appointmentt booked successfully!");
  };

  const disableWeekends = ({ date }) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const handleBook = () => {
    setIsBook(true);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const isTimeDisabled = (availability) => {
    const [hour, minute] = availability.split(":");
    const [currHour, currMinute] = currTime.split(":");

    const availabilityTime = new Date(selectedDate);
    availabilityTime.setHours(parseInt(hour), parseInt(minute), 0, 0);

    const currentTime = new Date();
    currentTime.setHours(parseInt(currHour), parseInt(currMinute), 0, 0);

    return availabilityTime < currentTime;
  };

  return (
    <div className="w-full">
      <div
        className="fixed inset-0 bg-black opacity-50 z-50"
        onClick={closeModal}
      ></div>

      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-xl w-full max-w-4xl shadow-lg relative">
          <div>
            <div className="pb-7">
              <button
                onClick={closeModal}
                className="absolute top-2 right-4 text-5xl text-gray-400 hover:text-gray-600 rounded-full w-10 h-10 flex items-center justify-center"
              >
                &times;
              </button>
            </div>
            {!isBook ? (
              <div className="flex justify-between">
                <div className="flex">
                  {doctorInfo && (
                    <div className="flex flex-col">
                      <div className="flex items-center mb-4">
                        <img
                          src={doctorInfo.profilePhoto}
                          alt="Doctor"
                          className="w-36 h-36 rounded-full mr-4"
                        />
                        <div>
                          <h3 className="text-lg text-gray-800">
                            <span className="font-bold">Phone Number :</span>{" "}
                            {doctorInfo.phoneNumber}
                          </h3>
                          <h3 className="text-lg text-gray-800">
                            <span className="font-bold">Email :</span>{" "}
                            {doctorInfo.gender.charAt(0).toUpperCase() +
                              doctorInfo.gender.slice(1).toLowerCase()}
                          </h3>
                          <h3 className="text-lg text-gray-800">
                            <span className="font-bold">Experience :</span>{" "}
                            {doctorInfo.experience}
                          </h3>
                          <h3 className="text-lg text-gray-800">
                            <span className="font-bold">Fees :</span> Rs.{" "}
                            {doctorInfo.fees}
                          </h3>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg text-gray-800">
                          <span className="font-bold">Name :</span>{" "}
                          {doctorInfo.username}
                        </h3>
                        <p className="text-gray-600">
                          <span className="font-bold">Specializations : </span>
                          {doctorInfo.specialization.map(
                            (specialization, index) => (
                              <span key={index}>
                                {specialization}
                                {index < doctorInfo.specialization.length - 1
                                  ? ", "
                                  : ""}
                              </span>
                            )
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
                    Choose an Option
                  </h2>

                  <div className="space-y-4">
                    <Link
                      to={`/user/features/chat-with-doctor/${doctorInfo._id}`}
                      onClick={closeModal}
                    >
                      <button className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
                        Chat
                      </button>
                    </Link>

                    <button
                      onClick={handleBook}
                      className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                    >
                      Book Appointment
                    </button>

                    <button
                      onClick={closeModal}
                      className="w-full py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center justify-center gap-2 transition duration-200"
                    >
                      Like
                      <img
                        className="w-6 h-6"
                        src={
                          doctorInfo.likedBy.includes(userId)
                            ? "/like-solid.svg"
                            : "/like-regular.svg"
                        }
                        alt="Like Icon"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="flex items-start justify-around gap-4">
                  <div>
                    <h1 className="text-4xl mb-4 font-bold">Select Time</h1>
                    <div className="flex flex-wrap gap-4">
                      {doctorInfo.availability
                        .sort((a, b) => {
                          const [hourA, minuteA] = a.split(":").map(Number);
                          const [hourB, minuteB] = b.split(":").map(Number);
                          return hourA - hourB || minuteA - minuteB;
                        })
                        .map((availability, ind) => (
                          <div
                            key={ind}
                            className={`w-16 h-16 flex items-center justify-center text-center cursor-pointer rounded-md 
                          ${
                            selectedTime === availability
                              ? "border-2 border-black"
                              : "border border-gray-300"
                          } ${
                              isTimeDisabled(availability)
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            onClick={() =>
                              !isTimeDisabled(availability) &&
                              handleTimeClick(availability)
                            }
                          >
                            <h3 className="text-sm text-gray-800">
                              {availability}
                            </h3>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <h1 className="text-4xl font-bold">Selected Date</h1>
                    <div className="mt-4">
                      <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
                        className="shadow-md rounded-lg w-84 h-auto"
                        minDate={new Date()}
                        maxDate={
                          new Date(
                            new Date().setFullYear(new Date().getFullYear() + 3)
                          )
                        }
                        tileDisabled={disableWeekends}
                      />
                    </div>
                  </div>
                </div>

                <div className=" items-center mt-4">
                  <h2 className="text-xl">
                    You selected:{" "}
                    {selectedTime ? (
                      <span className="font-bold">
                        {selectedTime} at {selectedDate.toDateString()}
                      </span>
                    ) : (
                      <span className="font-bold">
                        No Time and Date Selected
                      </span>
                    )}
                  </h2>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleBookAppointment}
                    className="mt-4 w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                  >
                    Book Appointment
                  </button>
                  <button
                    onClick={() => setIsBook(false)}
                    className="mt-4 w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal_Appointment;
