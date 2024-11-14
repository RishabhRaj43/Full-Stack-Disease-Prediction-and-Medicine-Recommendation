import React, { useState } from "react";

const ChooseSymptoms = ({
  checkedItems,
  handleCheckboxChange,
  handleSubmit,
}) => {
  const [diseases, setDiseases] = useState([
    { name: "Itching" },
    { name: "Skin Rash" },
    { name: "Nodal Skin Eruptions" },
    { name: "Continuous Sneezing" },
    { name: "Shivering" },
    { name: "Chills" },
    { name: "Joint Pain" },
    { name: "Stomach Pain" },
    { name: "Acidity" },
    { name: "Ulcers on Tongue" },
    { name: "Muscle Wasting" },
    { name: "Vomiting" },
    { name: "Burning Micturition" },
    { name: "Spotting Urination" },
    { name: "Fatigue" },
    { name: "Weight Gain" },
    { name: "Anxiety" },
    { name: "Cold hands and Feet" },
    { name: "Mood Swings" },
    { name: "Weight Loss" },
    { name: "Restlessness" },
    { name: "Lethargy" },
    { name: "Patches in Throat" },
    { name: "Irregular Sugar Level" },
    { name: "Cough" },
    { name: "High Fever" },
    { name: "Sunken Eyes" },
    { name: "Breathlessness" },
    { name: "Sweating" },
    { name: "Dehydration" },
    { name: "Indigestion" },
    { name: "Headache" },
    { name: "Yellowish Skin" },
    { name: "Dark Urine" },
    { name: "Nausea" },
    { name: "Loss of Appetite" },
    { name: "Pain behind the Eyes" },
    { name: "Back Pain" },
    { name: "Constipation" },
    { name: "Abdominal Pain" },
    { name: "Diarrhoea" },
    { name: "Mild Fever" },
    { name: "Yellow Urine" },
    { name: "Yellowing of Eyes" },
    { name: "Acute Liver Failure" },
    { name: "Fluid Overload" },
    { name: "Swelling of Stomach" },
    { name: "Swelled Lymph Nodes" },
    { name: "Malaise" },
    { name: "Blurred and Distorted Vision" },
    { name: "Phlegm" },
    { name: "Throat Irritation" },
    { name: "Redness of Eyes" },
    { name: "Sinus Pressure" },
    { name: "Runny Nose" },
    { name: "Congestion" },
    { name: "Chest Pain" },
    { name: "Weakness in Limbs" },
    { name: "Fast Heart Rate" },
    { name: "Pain during Bowel Movements" },
    { name: "Pain in Anal Region" },
    { name: "Bloody Stool" },
    { name: "Irritation in Anus" },
    { name: "Neck Pain" },
    { name: "Dizziness" },
    { name: "Cramps" },
    { name: "Bruising" },
    { name: "Obesity" },
    { name: "Swollen Legs" },
    { name: "Swollen Blood Vessels" },
    { name: "Puffy Face and Eyes" },
    { name: "Enlarged Thyroid" },
    { name: "Brittle Nails" },
    { name: "Swollen Extremities" },
    { name: "Excessive Hunger" },
    { name: "Extra Marital Contacts" },
    { name: "Drying and Tingling Lips" },
    { name: "Slurred Speech" },
    { name: "Knee Pain" },
    { name: "Hip Joint Pain" },
    { name: "Muscle Weakness" },
    { name: "Stiff Neck" },
    { name: "Swelling Joints" },
    { name: "Movement Stiffness" },
    { name: "Spinning Movements" },
    { name: "Loss of Balance" },
    { name: "Unsteadiness" },
    { name: "Weakness of One Body Side" },
    { name: "Loss of Smell" },
    { name: "Bladder Discomfort" },
    { name: "Foul Smell of Urine" },
    { name: "Continuous Feel of Urine" },
    { name: "Passage of Gases" },
    { name: "Internal Itching" },
    { name: "Toxic Look (Typhos)" },
    { name: "Depression" },
    { name: "Irritability" },
    { name: "Muscle Pain" },
    { name: "Altered Sensorium" },
    { name: "Red Spots Over Body" },
    { name: "Belly Pain" },
    { name: "Abnormal Menstruation" },
    { name: "Dischromic Patches" },
    { name: "Watering from Eyes" },
    { name: "Increased Appetite" },
    { name: "Polyuria" },
    { name: "Family History" },
    { name: "Mucoid Sputum" },
    { name: "Rusty Sputum" },
    { name: "Lack of Concentration" },
    { name: "Visual Disturbances" },
    { name: "Receiving Blood Transfusion" },
    { name: "Receiving Unsterile Injections" },
    { name: "Coma" },
    { name: "Stomach Bleeding" },
    { name: "Distention of Abdomen" },
    { name: "History of Alcohol Consumption" },
    { name: "Fluid Overload" },
    { name: "Blood in Sputum" },
    { name: "Prominent Veins on Calf" },
    { name: "Palpitations" },
    { name: "Painful Walking" },
    { name: "Pus Filled Pimples" },
    { name: "Blackheads" },
    { name: "Scarring" },
    { name: "Skin Peeling" },
    { name: "Silver-like Dusting" },
    { name: "Small Dents in Nails" },
    { name: "Inflammatory Nails" },
    { name: "Blister" },
    { name: "Red Sore Around Nose" },
    { name: "Yellow Crust Ooze" },
  ]);
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
