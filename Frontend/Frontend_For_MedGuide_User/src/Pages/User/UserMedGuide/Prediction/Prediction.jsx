import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faVirus } from "@fortawesome/free-solid-svg-icons";
import Disease from "./Disease/Disease";
import Predict from "./SymptomsPrediction/Predict";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

const Prediction = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [active, setActive] = useState(searchParams.get("active") || "Predict");

  useEffect(() => {
    setActive(searchParams.get("active") || "Predict");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [searchParams]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      {active === "Predict" ? <Predict /> : <Disease />}

      <div className="px-7 w-full flex justify-center sticky bottom-0 py-5 z-10">
        <div className="flex bg-white rounded-3xl shadow-2xl w-1/6 p-2 justify-between">
          <motion.div
            className={`flex-1 flex items-center justify-center flex-col cursor-pointer`}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("?active=Predict")}
          >
            <motion.div
              className={`flex items-center justify-center p-3 rounded-full ${
                active === "Predict"
                  ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              <FontAwesomeIcon icon={faHeart} className="text-2xl" />
            </motion.div>
            <motion.span
              className={`mt-2 text-sm font-semibold transition-colors ${
                active === "Predict" ? "text-indigo-500" : "text-gray-500"
              }`}
            >
              Prediction
            </motion.span>
          </motion.div>

          <motion.div
            className={`flex-1 flex items-center justify-center flex-col cursor-pointer ${
              active === "Disease" && "scale-110"
            }`}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("?active=Disease")}
          >
            <div
              className={`flex items-center justify-center p-3 rounded-full ${
                active === "Disease"
                  ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              <FontAwesomeIcon icon={faVirus} className="text-2xl" />
            </div>
            <span
              className={`mt-2 text-sm font-semibold transition-colors ${
                active === "Disease" ? "text-indigo-500" : "text-gray-500"
              }`}
            >
              Disease
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Prediction;
