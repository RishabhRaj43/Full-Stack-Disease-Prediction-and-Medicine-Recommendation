import React, { useState } from "react";
import { motion } from "framer-motion";
import Calendar from "react-calendar";
import toast from "react-hot-toast";
import "react-calendar/dist/Calendar.css";
import { createAppointment } from "../../../../Apis/DoctorManagement/Appointment/Appointment";

const CreateAppointmentModal = ({
  doctorInfo,
  openModal,
  setOpenModal,
  setOpenCreateModal,
}) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currDoctorInfo, setCurrDoctorInfo] = useState(doctorInfo);

  const today = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 2);

  const handleCreateBooking = async () => {
    if (!selectedTime || !selectedDate) {
      toast.error("Please select both a time and a date.");
      return;
    }
  
    const formData = {
      doctorId: doctorInfo._id,
      time: selectedTime,
      date: selectedDate.toISOString().split("T")[0],
    };
  
    const toastPromise = toast.promise(createAppointment(formData), {
      loading: "Creating booking...",
      success: (res) => {
        return res?.data?.message || "Booking created successfully.";
      },
      error: (err) => {
        return err?.response?.data?.message || "Failed to create booking.";
      },
    });
  
    setTimeout(() => {
      toastPromise({ success: true });
    }, 3000);
  };
  

  const handleCancelBooking = () => {
    setOpenCreateModal(false);
  };

  const disableWeekends = ({ date }) => {
    return date.getDay() === 0 || date.getDay() === 6;
  };

  return (
    openModal && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-4xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left Section: Time Slots */}
            <div className="w-full md:w-1/3 bg-gray-100 p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Select a Time:
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {doctorInfo?.availability?.map((time) => (
                  <div
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`cursor-pointer p-3 text-center rounded-md border text-gray-700 font-medium transition-all duration-200 ${
                      selectedTime === time
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    {time}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Section: Calendar */}
            <div className="w-full md:w-2/3 p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Select a Date:
              </h2>
              <Calendar
                onChange={setSelectedDate}
                tileDisabled={({ date }) =>
                  disableWeekends({ date }) || date < today
                }
                minDate={today}
                maxDate={maxDate}
                value={selectedDate}
                className="react-calendar text-black"
              />
            </div>
          </div>

          {/* Bottom Section: Selected Details & Buttons */}
          <div className="p-6 border-t flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-700">
              {selectedTime && selectedDate
                ? `Selected ${selectedTime} on ${selectedDate.toLocaleDateString(
                    "en-US",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  )}`
                : "Please select a time and a date."}
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleCancelBooking}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
              >
                Cancel Booking
              </button>
              <button
                onClick={handleCreateBooking}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all"
              >
                Create Booking
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    )
  );
};

export default CreateAppointmentModal;
