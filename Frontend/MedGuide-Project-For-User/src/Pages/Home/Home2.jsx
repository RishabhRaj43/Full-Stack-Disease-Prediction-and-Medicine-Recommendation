import React from "react";
import Home2_1 from "./Home2/Home2_1";
import Home2_2 from "./Home2/Home2_2";
import { motion } from "framer-motion";

const Home2 = () => {
  return (
    <motion.div
      className="flex flex-col md:flex-row w-full rounded-xl p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full md:w-2/3 md:pr-4 mb-4 md:mb-0">
        <Home2_1 />
      </div>

      <div className="w-full md:w-1/3 md:pl-4">
        <Home2_2 />
      </div>
    </motion.div>
  );
};

export default Home2;
