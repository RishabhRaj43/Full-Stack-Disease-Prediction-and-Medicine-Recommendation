import { motion } from "framer-motion";
import React, { useState } from "react";
import vector from "/Vector.png";
import arrow from "/arrow.png"; 
import { Link } from "react-router-dom";

const ChatComponent = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={"chat-with-ai"} target="_blank">
      <motion.div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
        initial={{ width: "70px", height: "70px" }}
        whileHover={{ width: "240px", height: "70px" }}
        onHoverStart={() => setIsHovered(true)} 
        onHoverEnd={() => setIsHovered(false)} 
        transition={{ type: "keyframes", stiffness: 300 }}
        whileTap={{ scale: 0.9 }}
        className="bg-blue-500 flex items-center justify-center  rounded-full"
      >
        {/* Image when not hovered */}
        {!isHovered && (
          <motion.img
            src={vector} // Show your vector image
            alt="Vector"
            className="w-8 h-8" // Set size for the image
            initial={{ opacity: 1 }}
            animate={{ opacity: isHovered ? 0 : 1 }} // Fade out when hovered
            transition={{ duration: 0.3 }} // Duration for the image transition
          />
        )}

        {/* Text and arrow image when hovered */}
        {isHovered && (
          <div className="flex items-center text-3xl">
            <motion.span
              initial={{ opacity: 0, scale: 1 }} // Initial state for the hovered text
              animate={{ opacity: 1, scale: 1 }} // Fade in and scale up on hover
              // exit={{ opacity: 1, scale: 0 }} // Fade out and scale down when not hovered
              transition={{ duration: 1.3 }} // Duration of the transition
              className="text-white mr-2" // Text styling with margin
            >
              Need Help?
            </motion.span>
            <motion.img
              src={arrow} // Show the arrow image
              alt="Arrow"
              className="w-9 h-9" // Set size for the arrow image
              initial={{ opacity: 0 }} // Initial opacity for the arrow
              animate={{ opacity: isHovered ? 1 : 0 }} // Fade in when hovered
              transition={{ duration: 0.3 }} // Duration for the arrow transition
            />
          </div>
        )}
      </motion.div>
    </Link>
  );
};

export default ChatComponent;
