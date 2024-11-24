import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getMostLikedDoctors,
  likeADoctor,
  unlikeADoctor,
} from "../../../../../Services/User/DoctorManagement/DoctorsInfo/DoctorInfo";
import useUserData from "../../../../../Zustand/User/useUserData";

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
    return () => {};
  }, [user]);

  const handleToggleLike = async (doctorId, isLiked) => {
    try {
      const { res, userId } = isLiked
        ? await unlikeADoctor(doctorId)
        : await likeADoctor(doctorId);

      toast.success(res.data.message);

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
    <div className="flex flex-col m-7 p-5">
      <h1 className="text-3xl font-bold px-3 text-center">
        Most Liked Doctors
      </h1>
      <div className="flex flex-col mt-4 gap-4 items-center">
        {mostLikedDoctors?.map((doctor) => (
          <div
            key={doctor._id}
            className="p-3 bg-cyan-300 rounded-3xl shadow-xl flex w-full flex-col"
          >
            <img src={doctor.profilePhoto} className="w-20 h-20" alt="" />
            <div className="flex justify-between items-center">
              <div>
                <h3 className=" text-xl font-semibold tracking-wide">
                  <span className="font-bold">Name: </span>
                  {doctor.username}
                </h3>
              </div>
              <div
                className="flex items-center space-x-2"
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
                  alt=""
                />
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
