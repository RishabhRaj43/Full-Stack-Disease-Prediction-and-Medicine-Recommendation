import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faPredict } from "@fortawesome/free-solid-svg-icons"; // Predict icon
import { faVirus as faDisease } from "@fortawesome/free-solid-svg-icons"; // Disease icon
import Disease from "./Disease";
import Predict from "./Predict";

const Prediction = () => {
  const [active, setActive] = useState("Predict");

  return (
    <div className=" flex flex-col">
      {active === "Predict" ? <Predict /> : <Disease />}

      {/* Bottom Navigation */}
      <div className="px-7 rounded-2xl w-full justify-center flex sticky bottom-0 py-5 z-10 ">
        <div className="flex bg-white rounded-2xl w-56 shadow-2xl">
          <div className="flex-1 group">
            <div
              className={`flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500 ${
                active === "Predict" && "text-indigo-500"
              } cursor-pointer`}
              onClick={() => setActive("Predict")}
            >
              <span className="block px-1 pt-1 pb-1">
                <FontAwesomeIcon
                  icon={faPredict}
                  className="text-2xl pt-1 mb-1"
                />
                <span className="block text-xs pb-2">Prediction</span>
                <span
                  className={`block w-5 mx-auto h-1 group-hover:bg-indigo-500
                   ${active === "Predict" && "bg-indigo-500"} rounded-full`}
                ></span>
              </span>
            </div>
          </div>

          <div className="flex-1 group">
            <div
              className={`flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500 ${
                active === "Disease" && "text-indigo-500"
              } cursor-pointer`}
              onClick={() => setActive("Disease")}
            >
              <span className="block px-1 pt-1 pb-1">
                <FontAwesomeIcon
                  icon={faDisease}
                  className="text-2xl pt-1 mb-1"
                />
                <span className="block text-xs pb-2">disease</span>
                <span
                  className={`block w-5 mx-auto h-1
                   ${active === "Disease" && "bg-indigo-500"} rounded-full`}
                ></span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prediction;
