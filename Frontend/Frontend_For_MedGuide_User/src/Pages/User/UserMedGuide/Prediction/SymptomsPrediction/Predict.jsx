import React, { useState } from "react";
import { motion } from "framer-motion";
import ChooseSymptoms from "./ChooseSymptoms";
import Recommendation from "./Recommendation";
import toast from "react-hot-toast";
import { predictDisease } from "../../../../../Services/User/Prediction/DiseaseInfo";
import Loader from "../../../../../Components/ui/Loader";

const Predict = () => {
  const finalArray = new Array(132).fill(0);
  const [checkedItems, setCheckedItems] = useState(finalArray);
  const [recommendationSection, setRecommendationSection] = useState(false);
  const [diseaseInfo, setDiseaseInfo] = useState({});
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (e, ind) => {
    setCheckedItems((prev) =>
      prev.map((item, i) => (i === ind ? (e.target.checked ? 1 : 0) : item))
    );
  };

  const handleSubmit = async () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!checkedItems.includes(1)) {
      toast.error("Please select at least one symptom");
      return;
    }
    setLoading(true);
    try {
      const res = await predictDisease(checkedItems);
      setCheckedItems(finalArray);
      setDiseaseInfo(res.data);
      setRecommendationSection(true);
    } catch (error) {
      toast.error("Error fetching disease information");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="flex-grow flex flex-col h-full bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
      {!loading ? (
        <>
          <motion.div
            className="text-2xl p-3 flex justify-between items-center font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl text-blue-900">Predict</h1>
            {recommendationSection && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-md"
                onClick={() => {
                  setLoading(false);
                  setRecommendationSection(false);
                }}
              >
                Back to Symptoms
              </motion.button>
            )}
          </motion.div>
          <motion.div
            className="flex-grow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {!recommendationSection ? (
              <ChooseSymptoms
                handleSubmit={handleSubmit}
                handleCheckboxChange={handleCheckboxChange}
                checkedItems={checkedItems}
              />
            ) : (
              <Recommendation diseaseInfo={diseaseInfo} />
            )}
          </motion.div>
        </>
      ) : (
        <motion.div
          className="flex-grow flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Loader
            title="Predicting"
            subtitle="Your disease is getting predicted!"
          />
        </motion.div>
      )}
    </div>
  );
};

export default Predict;
