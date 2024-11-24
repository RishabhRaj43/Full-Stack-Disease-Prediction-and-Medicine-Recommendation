import React, { useEffect, useState } from "react";
import Modal_Appointment from "./Modal_Appointment";
import toast from "react-hot-toast";
import { getAllDoctors } from "../../../../../../Services/User/DoctorManagement/DoctorsInfo/DoctorInfo";

const Book_Home_2 = () => {
  const [userId, setUserId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState({});
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const { res, userId } = await getAllDoctors();
        setUserId(userId);
        setDoctorList(res.data.doctors);
      } catch (error) {
        console.log("Error in fetchDoctor: ", error);
        toast.error(error.response.data.message);
      }
    };
    fetchDoctor();
  }, []);

  // Function to open the modal
  const openModal = () => {
    setIsOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-2/3">
      <div className="flex gap-3 mr-5">
        <input
          type="text"
          placeholder="Search Doctors"
          className="w-5/6 h-10 p-3 border-2 text-lg border-gray-900 rounded-xl"
        />
        <button className="text-white rounded-xl text-xl bg-[#00A4CC] w-1/6 h-10">
          Search
        </button>
      </div>
      <div>
        {doctorList?.map((doctor) => (
          <div
            key={doctor._id}
            className="flex items-center bg-cyan-200 rounded-xl p-4 mr-5 justify-between my-3"
          >
            <div className="flex items-center">
              <img
                src={doctor.profilePhoto}
                alt=""
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-3">
                <h2 className="text-lg font-semibold">{doctor.username}</h2>
                <p className="text-gray-600">{doctor.speciality}</p>
              </div>
            </div>
            <button
              onClick={() => {
                openModal();
                setDoctorInfo(doctor);
              }}
              className="text-white rounded-xl text-xl bg-[#00A4CC] w-1/6 h-10"
            >
              Book
            </button>
          </div>
        ))}
      </div>

      {isOpen && (
        <Modal_Appointment
          userId={userId}
          doctorInfo={doctorInfo}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default Book_Home_2;
