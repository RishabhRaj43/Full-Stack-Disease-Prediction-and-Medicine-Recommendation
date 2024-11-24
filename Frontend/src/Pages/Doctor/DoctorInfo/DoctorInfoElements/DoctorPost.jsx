import React from "react";
import { motion } from "framer-motion";
import PostCard from "../../Components/PostCard";

const DoctorPost = ({ doctor }) => {
  const postVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: "spring", stiffness: 80 },
    },
  };

  return (
    <motion.div
      className="max-w-4xl w-full m-3 bg-white shadow-lg rounded-xl"
      variants={postVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Posts Section */}
      <div className="overflow-y-auto max-h-[500px] border rounded-lg p-4">
        {/* Check if doctor has posts */}
        {doctor?.posts?.length > 0 ? (
          doctor?.posts?.map((post) => (
            <div key={post._id} className="my-4">
              <PostCard post={post} />
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            <p>No posts available.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DoctorPost;
