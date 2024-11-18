import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getMostLikedDoctors } from "../../../../../Services/User/DoctorManagement/DoctorsInfo/DoctorInfo";

const Home2_2 = () => {
  const [mostLikedDoctors, setMostLikedDoctors] = useState([]);
  useEffect(() => {
    const fetchMostLikedDoctors = async () => {
      try {
        const res = await getMostLikedDoctors();
        setMostLikedDoctors(res.data);
      } catch (error) {
        console.log("Error in fetchMostLikedDoctors: ", error);
        toast.error(error.response.data.message);
      }
    };

    fetchMostLikedDoctors();
    return () => {};
  }, []);
  return (
    <div className="flex flex-col m-7 p-5">
      <h1 className="text-3xl font-bold px-3 text-center">
        Most Liked Doctors
      </h1>
      <div className="flex flex-col mt-4 items-center rounded-xl bg-cyan-300 shadow-xl">
        {mostLikedDoctors.map((doctor) => (
          <div key={doctor._id} className="p-3 flex w-full flex-col">
            <img src={doctor.profilePhoto} className="w-20 h-20" alt="" />
            <div className="flex justify-between items-center">
              <div>
                <h3 className=" text-xl font-semibold tracking-wide">
                  <span className="font-bold">Name: </span>
                  {doctor.username}
                </h3>
                <p className=" text-lg font-semibold tracking-wide">
                  <span className="font-bold">Specialization: </span>
                  {doctor.specialization}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <img src="/like-solid.svg" className="w-6 h-6" alt="" />
                <p className="text-white text-xl font-semibold tracking-wide">
                  {doctor.likedBy.length}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home2_2;
