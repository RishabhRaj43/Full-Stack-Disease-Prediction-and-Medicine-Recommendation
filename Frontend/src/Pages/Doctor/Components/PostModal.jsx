import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../UI/Button";
import { createPost } from "../../../Services/Doctor/Post/PostRoute";
import { toast } from "react-hot-toast";

const PostModal = ({ toggleModal }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (!title || !content) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      const res = await createPost({ title, content });
      toast.success(res.data.message);
      toggleModal();
    } catch (error) {
      console.log("Error in handleSubmit: ", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <motion.div
      className="modal fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="modal-content bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-3xl font-bold text-gray-900 drop-shadow-lg">
            Create a Post
          </h3>

          <button
            onClick={toggleModal}
            className="text-gray-500 hover:text-red-500"
          >
            <FontAwesomeIcon size="2xl" icon={faTimes} />
          </button>
        </div>

        <div className="mt-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post Title"
            className="w-full p-3 border-2 border-indigo-400 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Post Content"
            className="w-full p-3 border-2 border-indigo-400 rounded-lg mt-4 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            rows="4"
          ></textarea>
        </div>

        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={toggleModal}
            className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            Close
          </button>
          <Button
            onClick={handleSubmit}
            text="Post"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PostModal;
