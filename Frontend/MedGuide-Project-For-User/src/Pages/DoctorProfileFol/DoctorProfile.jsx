import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaHeart, FaCheckCircle } from "react-icons/fa";
import {
  getDoctorInfo,
  likeADoctor,
  unlikeADoctor,
} from "../../Apis/DoctorManagement/DoctorsInfo/DoctorInfo";

const DoctorProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const res = await getDoctorInfo(id);
        setDoctor(res.res.data.doctor);
        setUserId(res.userId);
      } catch (error) {
        console.error("Error fetching doctor:", error);
        toast.error(error.response?.data?.message);
      }
    };
    fetchDoctorProfile();
  }, [id]);

  const handleToggleLike = async (doctorId, isLiked) => {
    try {
      const { res } = isLiked
        ? await unlikeADoctor(doctorId)
        : await likeADoctor(doctorId);
      toast.success(res?.data?.message);

      setDoctor((prev) => {
        if (prev._id === doctorId) {
          return {
            ...prev,
            likedBy: res.data.likes,
          };
        }
        return prev;
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!doctor) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-500 text-white p-6">
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-700 to-teal-600 shadow-lg rounded-lg p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-6 mb-8"
        >
          <div className="relative">
            <motion.img
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              src={doctor?.profilePhoto}
              alt={doctor?.username}
              className="w-60 h-60 rounded-full object-cover"
            />
            {doctor?.isVerified && (
              <div className="absolute bottom-2 right-2 bg-blue-600 text-white px-2 py-1 text-sm rounded-lg shadow-lg">
                <FaCheckCircle className="inline-block mr-1" />
                Verified
              </div>
            )}
          </div>

          <div className="flex-1">
            <motion.h1
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-3xl font-semibold"
            >
              {doctor?.username}
            </motion.h1>
            <motion.p
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xl text-gray-200"
            >
              {doctor?.specialization.join(", ")} | {doctor?.experience} years
              of experience
            </motion.p>

            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-4"
            >
              <span className="font-medium">Availability:</span>
              <div className="flex gap-4">
                {doctor?.availability?.map((time, index) => (
                  <span key={index} className="text-gray-200">
                    {time}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="flex space-x-4 mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              handleToggleLike(doctor?._id, doctor?.likedBy?.includes(userId))
            }
            className={`px-6 py-2 rounded-lg flex items-center gap-2 text-white ${
              doctor?.likedBy?.includes(userId)
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            <FaHeart
              className={`text-lg ${
                doctor?.likedBy?.includes(userId)
                  ? "text-red-500"
                  : "text-gray-300"
              }`}
            />
            <span className="font-semibold">
              {doctor?.likedBy?.includes(userId) ? "Liked" : "Like"}
            </span>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mt-8 bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-lg shadow-lg"
        >
          <motion.h2
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-semibold mb-4 text-white"
          >
            Contact Info
          </motion.h2>
          <motion.p
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-md text-gray-300 mb-4"
          >
            <span className="font-medium">Email:</span>
            <a
              className="text-blue-500 ml-2 hover:underline"
              href={`mailto:${doctor?.email}`}
            >
              {doctor?.email}
            </a>
          </motion.p>
          <motion.p
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-md text-gray-300"
          >
            <span className="font-medium">Phone:</span> {doctor?.phoneNumber}
          </motion.p>
          <motion.p
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-md text-gray-300"
          >
            <span className="font-medium">Fees:</span> ₹{doctor?.fees}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default DoctorProfile;
