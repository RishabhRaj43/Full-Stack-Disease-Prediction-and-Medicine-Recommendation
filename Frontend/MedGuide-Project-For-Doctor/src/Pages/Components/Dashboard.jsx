import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { RiHeart3Fill, RiAddLine, RiArticleLine } from "react-icons/ri";
import { FaThumbsUp } from "react-icons/fa";
import PostModal from "./PostModal";
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
      className="dashboard-container h-screen bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-100 p-8 max-w-7xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <motion.h2
          className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-teal-500 to-green-400 drop-shadow-md"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Doctor's Dashboard
        </motion.h2>

        <div className="flex space-x-6 items-center">
          {/* Post Button */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 4px 20px rgba(72, 187, 255, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleModal}
            className="text-white font-medium bg-gradient-to-r from-teal-500 to-blue-600 px-6 py-3 rounded-full hover:from-blue-600 hover:to-teal-500 transition-all duration-300 flex items-center shadow-md"
          >
            Post Your Thought <RiAddLine className="ml-2 text-2xl" />
          </motion.button>

          {/* Profile Picture */}
          <Link to={"doctor-info"}>
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 rounded-full overflow-hidden shadow-lg"
            >
              <img
                src={doctor.profilePhoto}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </Link>
        </div>
      </div>

      {isModalOpen && <PostModal toggleModal={toggleModal} />}

      {/* Stats Section */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Card 1 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-gradient-to-r from-blue-100 to-teal-50 rounded-lg shadow-xl"
        >
          <h3 className="text-xl font-semibold text-blue-700">Total Posts</h3>
          <div className="flex items-center gap-4 mt-4">
            <RiArticleLine className="text-blue-600 text-3xl" />
            <p className="text-lg font-semibold text-gray-800">{posts.length}</p>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-gradient-to-r from-green-100 to-blue-50 rounded-lg shadow-xl"
        >
          <h3 className="text-xl font-semibold text-green-700">Total Likes on Posts</h3>
          <div className="flex items-center gap-4 mt-4">
            <FaThumbsUp className="text-teal-500 text-3xl" />
            <p className="text-lg font-semibold text-gray-800">{likeCount}</p>
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-gradient-to-r from-pink-100 to-red-50 rounded-lg shadow-xl"
        >
          <h3 className="text-xl font-semibold text-red-700">Liked By Patients</h3>
          <div className="flex items-center gap-4 mt-4">
            <RiHeart3Fill className="text-red-500 text-3xl" />
            <p className="text-lg font-semibold text-gray-800">
              {doctor?.likedBy?.length || 0}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Top Posts Section */}
      <div>
        <motion.h3
          className="text-2xl font-semibold text-gray-800 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Top 5 Most Liked Posts
        </motion.h3>

        {posts?.length > 0 ? (
          <motion.ul
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {posts
              .sort((a, b) => b.likes.length - a.likes.length)
              .slice(0, 5)
              .map((post) => (
                <motion.li
                  key={post._id}
                  whileHover={{ scale: 1.03 }}
                  className="p-6 bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg shadow-lg flex justify-between items-center"
                >
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {post.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-2">{post.content}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaThumbsUp className="text-blue-500 text-xl" />
                    <p className="text-sm text-gray-600">
                      {post.likes.length} Likes
                    </p>
                  </div>
                </motion.li>
              ))}
          </motion.ul>
        ) : (
          <div className="p-6 bg-gradient-to-r from-yellow-100 to-yellow-50 rounded-lg shadow-lg text-center">
            <p className="text-lg font-medium text-gray-800">No posts found.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Dashboard;
