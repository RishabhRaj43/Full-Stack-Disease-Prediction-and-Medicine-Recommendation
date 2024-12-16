import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  dislikeDoctorPost,
  getAllDoctorPosts,
  likeDoctorPost,
} from "../../../Apis/DoctorManagement/UserPost/UserPost";
import { Link } from "react-router-dom";

const Home2_1 = () => {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);

  const handleToggleLike = async (postId, isLiked) => {
    try {
      const res = isLiked
        ? await dislikeDoctorPost(postId)
        : await likeDoctorPost(postId);
      setPosts((prevPosts) => {
        return prevPosts.map((post) => {
          if (post._id === postId) {
            return { ...post, likes: res.data.likes };
          }
          return post;
        });
      });
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error in handleToggleLike: ", error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { res, userId } = await getAllDoctorPosts();
        setUserId(userId);
        setPosts(res);
      } catch (error) {
        console.log("Get All Doctor Posts Error: ", error);
        toast.error(error.response.data.message);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col m-7 p-5 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold px-3 text-center text-blue-800">
        Recent Posts By Doctors
      </h1>
      <div className="space-y-4 mt-4">
        {posts ? (
          posts.map((post) => (
            <motion.div
              key={post._id}
              className="flex justify-between rounded-xl p-3 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 items-center space-x-4 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex space-x-4 items-center">
                <img
                  src={post.doctorId.profilePhoto}
                  alt="Profile"
                  className="w-12 h-12 object-cover rounded-full"
                />
                <div>
                  <h2 className="text-lg font-semibold text-blue-700">
                    {post.title} by{" "}
                    <Link to={`/doctor-profile/${post.doctorId._id}`}>
                      <span className="hover:underline">
                        {post.doctorId.username}
                      </span>
                    </Link>
                  </h2>
                  <p className="text-gray-700 pl-2">{post.content}</p>
                  <p className="text-gray-500 text-xs font-semibold">
                    {post.timeAgo}
                  </p>
                </div>
              </div>
              <div
                className="cursor-pointer flex items-center space-x-2"
                onClick={() =>
                  handleToggleLike(post._id, post.likes.includes(userId))
                }
              >
                <img
                  src={
                    post.likes.includes(userId)
                      ? "/like-solid.svg"
                      : "/like-regular.svg"
                  }
                  className="w-6 h-auto"
                  alt="Like icon"
                />
                <p className="text-blue-700">{post.likes.length}</p>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            className="flex justify-between rounded-xl p-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 items-center space-x-4 shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            No Post Found Till Now!!
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home2_1;
