import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  getMostLikedDoctors,
  likeADoctor,
  unlikeADoctor,
} from "../../../Apis/DoctorManagement/DoctorsInfo/DoctorInfo";
import useUserData from "../../../Zustand/useUserData";
import { Link } from "react-router-dom";

const Home2_2 = () => {
  const [mostLikedDoctors, setMostLikedDoctors] = useState([]);
  const { user, fetchUserData } = useUserData();

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

    if (!user) {
      fetchUserData();
    }
  }, [user]);

  const handleToggleLike = async (doctorId, isLiked) => {
    try {
      const { res, userId } = isLiked
        ? await unlikeADoctor(doctorId)
        : await likeADoctor(doctorId);
      toast.success(res?.data?.message);

      setMostLikedDoctors((prev) =>
        prev.map((prevDoctor) => {
          if (prevDoctor._id === doctorId) {
            return {
              ...prevDoctor,
              likedBy: res.data.likes,
            };
          }
          return prevDoctor;
        })
      );
    } catch (error) {
      console.log("Error in handleToggleLike: ", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col m-7 p-5 bg-gradient-to-r from-green-100 via-green-200 to-green-300 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold px-3 text-center text-teal-700">
        Most Liked Doctors
      </h1>
      <div className="flex flex-col mt-4 gap-4 items-center">
        {mostLikedDoctors
          ?.sort((a, b) => b.likedBy.length - a.likedBy.length)
          .map((doctor) => (
            <motion.div
              key={doctor._id}
              className="p-3 bg-gradient-to-r from-green-100 via-green-200 to-green-300 rounded-3xl flex w-full items-center flex-col hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex gap-3 justify-around items-center">
                <img
                  src={doctor.profilePhoto}
                  className="w-20 h-20 object-cover rounded-full"
                  alt=""
                />
                <div className="flex justify-between items-center mt-2">
                  <div>
                    <h3 className="text-xl font-semibold tracking-wide text-teal-700">
                      <span className=" font-bold">Name: </span>
                      <Link
                        to={`/doctor-profile/${doctor._id}`}
                        className="hover:underline"
                      >
                        {doctor.username}
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => {
                  handleToggleLike(
                    doctor?._id,
                    doctor?.likedBy?.includes(user?._id)
                  );
                }}
              >
                <img
                  src={
                    doctor?.likedBy?.includes(user?._id)
                      ? "/like-solid.svg"
                      : "/like-regular.svg"
                  }
                  className="w-6 h-6"
                  alt="Like icon"
                />
                <p className="text-teal-700 text-xl font-semibold tracking-wide">
                  {doctor.likedBy.length}
                </p>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default Home2_2;
