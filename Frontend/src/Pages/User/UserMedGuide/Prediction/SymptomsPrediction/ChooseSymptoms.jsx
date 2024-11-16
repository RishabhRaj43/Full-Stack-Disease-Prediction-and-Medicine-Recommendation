import React, { useState } from "react";
import Symptoms from "../SymptomsData";

const ChooseSymptoms = ({
  checkedItems,
  handleCheckboxChange,
  handleSubmit,
}) => {
  const [diseases, setDiseases] = useState(Symptoms);
  return (
    <div>
      <h1 className=" px-3 font-bold text-3xl">Choose Symptoms: </h1>
      <div className=" p-2 grid grid-cols-4 gap-2">
        {diseases.map((disease, ind) => (
          <div
            className="flex items-center justify-between p-3 w-full"
            key={ind}
          >
            <h1 className="text-gray-700 font-medium">{disease.name}</h1>
            <label className="flex items-center cursor-pointer relative">
              <input
                type="checkbox"
                id={disease.name}
                name={disease.name}
                value={disease.name}
                checked={checkedItems[ind] === 1}
                onChange={(e) => handleCheckboxChange(e, ind)}
                className="peer h-7 w-7 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
              />
              <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="bg-[#4CC9FE] text-white font-semibold text-3xl hover:bg-[#37AFE1] p-3 rounded-lg w-full"
      >
        Predict
      </button>
    </div>
  );
};

export default ChooseSymptoms;
