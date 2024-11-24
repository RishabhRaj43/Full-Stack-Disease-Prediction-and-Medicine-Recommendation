import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPlus,
  faSignsPost,
} from "@fortawesome/free-solid-svg-icons";
import PostModal from "./PostModal";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Dashboard = ({ posts, doctor }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(0);  
  
  useMemo(() => {
    let count = 0;
    posts.forEach((post) => {
      count += post.likes.length;
    });
    setLikeCount(count);
  }, [posts]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <motion.div
      className="dashboard-container p-8 max-w-7xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <motion.h2
          className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-800 drop-shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Dashboard
        </motion.h2>

        <div className="flex space-x-4 items-center">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 4px 20px rgba(59, 130, 246, 0.5)",
              backgroundPosition: "100% 100%",
            }}
            whileTap={{
              scale: 1,
              boxShadow: "none",
              backgroundPosition: "0% 0%",
            }}
            onClick={toggleModal}
            className="text-black font-bold bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 rounded-full hover:bg-gradient-to-l transition-all duration-300 ease-in-out relative overflow-hidden"
          >
            Post Your Thought <FontAwesomeIcon icon={faPlus} className="ml-2" />
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-400 to-indigo-500 opacity-30"></span>
          </motion.button>
          <Link to={"doctor-info"}>
            <motion.button>
              <img src={doctor.profilePhoto} className="w-16 h-16" alt="" />
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Post Modal */}
      {isModalOpen && (
        <PostModal toggleModal={toggleModal} />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Total Number of Posts */}
        <div className="my-6 p-6 bg-cyan-100 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-gray-800">
            Total Number of Posts
          </h3>
          <div className="flex items-center gap-4 mt-4">
            <FontAwesomeIcon
              icon={faSignsPost}
              className="text-cyan-600 text-2xl"
            />
            <p className="text-lg font-semibold text-gray-800">
              {posts.length}
            </p>
          </div>
        </div>

        {/* Total Number of Likes */}
        <div className="my-6 p-6 bg-cyan-100 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-gray-800">
            Total Number of Likes
          </h3>
          <div className="flex items-center gap-4 mt-4">
            <FontAwesomeIcon
              icon={faThumbsUp}
              className="text-blue-600 text-2xl"
            />
            <p className="text-lg font-semibold text-gray-800">{likeCount}</p>
          </div>
        </div>

        {/* Liked By Patients */}
        <div className="my-6 p-6 bg-cyan-100 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-gray-800">Liked By Patients</h3>
          <div className="flex items-center gap-4 mt-4">
            <FontAwesomeIcon icon={faHeart} className="text-red-600 text-2xl" />
            <p className="text-lg font-semibold text-gray-800">
              {doctor?.likedBy?.length}
            </p>
          </div>
        </div>
      </div>

      {/* Top 5 Most Liked Posts */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Top 5 Most Liked Posts
        </h3>
        {posts?.length > 0 ? (
          <ul className="space-y-4">
            {posts
              .sort((a, b) => b.likes.length - a.likes.length)
              .slice(0, 5)
              .map((post) => (
                <li
                  key={post._id}
                  className="p-6 bg-cyan-100 flex justify-between items-center rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">
                      {post.title}
                    </h4>
                    <p className="text-gray-600 mt-2">{post.content}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      className="text-lg text-blue-500"
                    />
                    <p className="text-sm text-gray-500">
                      {post.likes.length} Likes
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        ) : (
          <div className="p-4 border rounded-lg shadow-md bg-cyan-200">
            <p className="text-lg font-semibold text-gray-800">
              No posts found.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Dashboard;
