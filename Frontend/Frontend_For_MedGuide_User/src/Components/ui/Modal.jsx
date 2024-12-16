import React, { useEffect, useState } from "react";
import Loader from "./Loader";

const Modal = ({ isOpen,loading, onClose, diseaseInfo }) => {
  const [accordionData, setAccordionData] = useState({
    Description: "",
    Workout: "",
    Diets: "",
    Medication: "",
  });

  useEffect(() => {
    if (diseaseInfo) {
      setAccordionData({
        Description: diseaseInfo.description || "",
        Workout: diseaseInfo.workout ? diseaseInfo.workout.join(", ") : "",
        Diets: diseaseInfo.diets
          ? diseaseInfo.diets[0]
              .replace(/[\[\]']+/g, "")
              .split(", ")
              .join(", ")
          : "",
        Medication: diseaseInfo.medication
          ? diseaseInfo.medication[0]
              .replace(/[\[\]']+/g, "")
              .split(", ")
              .join(", ")
          : "",
      });
    }
  }, [diseaseInfo]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-1/3 max-h-[80vh] flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Disease Information</h2>

        {loading ? (
          <Loader title={"Loading"} subtitle={"Data is being fetched!"}  />
        ) : (
          <div className="flex-1 overflow-y-auto mb-4">
            {Object.keys(accordionData).map((key, ind) => (
              <div key={key} className={ind != 0 ? "mt-2" : ""}>
                <h3 className="text-lg font-semibold">{key}</h3>
                <p className="text-sm">{accordionData[key]}</p>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-4 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
