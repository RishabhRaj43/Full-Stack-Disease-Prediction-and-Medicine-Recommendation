import React, { useState, useEffect } from "react";

const DoctorAppointments = ({ doctor }) => {
  const [appointments, setAppointments] = useState(doctor.appointments || []);
  const [filter, setFilter] = useState("all");

  const filteredAppointments =
    filter === "all"
      ? appointments
      : appointments.filter((appointment) =>
          filter === "booked"
            ? appointment.status === "booked"
            : appointment.status === "completed"
        );

  return (
    <div className="max-w-3xl w-full mx-auto p-6 bg-white shadow-lg rounded-xl">

      {/* Filter for Upcoming, Completed, and All appointments */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setFilter("booked")}
          className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded-lg transition duration-200"
        >
          Upcoming
        </button>
        <button
          onClick={() => setFilter("completed")}
          className="px-4 py-2 text-white bg-green-500 hover:bg-green-700 rounded-lg transition duration-200"
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("all")}
          className="px-4 py-2 text-white bg-gray-500 hover:bg-gray-700 rounded-lg transition duration-200"
        >
          Clear Filter
        </button>
      </div>

      {/* Display appointments */}
      <div
        className="space-y-6 max-h-96 overflow-y-auto"
        style={{ maxHeight: 'calc(100vh - 250px)' }} // Adjust height as needed
      >
        {filteredAppointments.length === 0 ? (
          <p className="text-center text-xl text-gray-500">
            No appointments available.
          </p>
        ) : (
          filteredAppointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <div className=" flex gap-4 items-center">
                  <img
                    src={appointment.patientId.profilePhoto}
                    className="w-12 h-12 rounded-full"
                    alt=""
                  />
                  <p className="text-xl font-medium text-blue-700">
                    {appointment.patientId.username}
                  </p>
                </div>
                <p
                  className={`text-sm px-3 py-1 rounded-full text-white ${
                    appointment.status === "booked"
                      ? "bg-blue-500"
                      : appointment.status === "completed"
                      ? "bg-green-500"
                      : appointment.status === "cancelled"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {appointment.status}
                </p>
              </div>
              <div className="text-gray-700 w-full flex justify-between">
                <div className="">
                  <p>
                    <strong>Email:</strong> {appointment.patientId.email}
                  </p>
                  <p>
                    <strong>Phone Number:</strong>{" "}
                    {appointment.patientId.phoneNumber}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Start:</strong>{" "}
                    {new Date(appointment.start).toLocaleString()}
                  </p>
                  <p>
                    <strong>End:</strong>{" "}
                    {new Date(appointment.end).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
