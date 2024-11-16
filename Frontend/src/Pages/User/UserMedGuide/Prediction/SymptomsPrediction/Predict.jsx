import React, { useState } from "react";
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
    setCheckedItems((prev) => {
      const updatedCheckedItems = [...prev];
      updatedCheckedItems[ind] = e.target.checked ? 1 : 0;
      return updatedCheckedItems;
    });
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
      console.log(error);
      toast.error("Error fetching disease information");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="flex-grow flex-col flex text-2xl h-full">
      {!loading ? (
        <>
          <div className="text-2xl p-3 flex justify-between font-bold">
            <h1 className="text-6xl">Predict</h1>
            {recommendationSection && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  setLoading(false);
                  setRecommendationSection(false);
                }}
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
        </>
      ) : (
        <Loader
          title="Predicting"
          subtitle="Your disease is getting predicted!"
        />
      )}
    </div>
  );
};

export default Predict;
