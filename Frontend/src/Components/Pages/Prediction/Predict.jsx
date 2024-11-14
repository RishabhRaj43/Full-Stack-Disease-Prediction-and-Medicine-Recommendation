import React, { useState } from "react";
import ChooseSymptoms from "./ChooseSymptoms";
import Recommendation from "./Recommendation";
import toast from "react-hot-toast";
import axios from "axios";

const Predict = () => {
  const [checkedItems, setCheckedItems] = useState(new Array(132).fill(0));
  const [recommendationSection, setRecommendationSection] = useState(false);
  const [diseaseInfo, setDiseaseInfo] = useState({});

  const handleCheckboxChange = (e, ind) => {
    setCheckedItems((prev) => {
      const updatedCheckedItems = [...prev];
      updatedCheckedItems[ind] = e.target.checked ? 1 : 0;
      return updatedCheckedItems;
    });
  };

  const handleSubmit = async () => {
    if (!checkedItems.includes(1)) {
      toast.error("Please select at least one symptom");
      return;
    }
    try {
      const res = await axios.post("http://localhost:2000/api/predict", 
        checkedItems,
      );
      console.log(res);
      
      setDiseaseInfo(res.data);
      setRecommendationSection(true);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching disease information");
    }
  };

  return (
    <div className="flex-grow flex-colflex text-2xl">
      <div className="text-2xl p-3 flex justify-between font-bold">
        <h1 className="text-6xl">Predict</h1>
        {recommendationSection && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setRecommendationSection(false)}
          >
            Back to symptoms
          </button>
        )}
      </div>
      {!recommendationSection ? (
        <ChooseSymptoms
          handleSubmit={handleSubmit}
          handleCheckboxChange={handleCheckboxChange}
          checkedItems={checkedItems}
        />
      ) : (
        <Recommendation diseaseInfo={diseaseInfo} />
      )}
    </div>
  );
};

export default Predict;
