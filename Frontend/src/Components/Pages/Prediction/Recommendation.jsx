import React, { useCallback, useRef, useState, useMemo } from "react";

const Recommendation = ({ diseaseInfo }) => {
  // Use the ref array to store references for each accordion's content
  const contentRefs = useRef([]);

  const [activeAccordion, setActiveAccordion] = useState(null);
  const [refreshFunFact, setRefreshFunFact] = useState(0);

  const [accordionData, setAccordionData] = useState({
    disease: "",
    description: "",
    workout: "",
    diets: "",
    medication: "",
  });

  useMemo(() => {
    setAccordionData({
      Description: diseaseInfo.description,
      Workout: diseaseInfo.workout.join(", "),
      Diets: diseaseInfo.diets[0]
        .replace(/[\[\]']+/g, "")
        .split(", ")
        .join(", "),
      Medication: diseaseInfo.medication[0]
        .replace(/[\[\]']+/g, "")
        .split(", ")
        .join(", "),
    });
  }, [diseaseInfo]);

  const funFacts = [
    "The human nose can detect over 1 trillion different smells. 👃",
    "Your body has enough iron in it to make a nail that's 3 inches long. 🧲",
    "The human body contains about 37.2 trillion cells. 🔬",
    "Your skin is the largest organ in your body. 🧑‍⚕️",
    "The average human heart beats around 100,000 times a day. ❤️",
    "Humans share about 60% of their DNA with bananas. 🍌",
    "A sneeze travels out of your nose at over 100 miles per hour. 🌬️",
    "Your bones are constantly being broken down and rebuilt. 🦴",
    "The human brain is about 75% water. 🧠💧",
    "On average, you produce about 1 to 1.5 quarts of saliva each day. 💦",
  ];

  const handleAccordionToggle = useCallback(
    (index) => {
      if (activeAccordion === index) {
        setActiveAccordion(null);
      } else {
        setActiveAccordion(index);
      }
    },
    [activeAccordion]
  );

  const randomFunFact = useMemo(() => {
    return funFacts[Math.floor(Math.random() * funFacts.length)];
  }, [refreshFunFact]);

  return (
    <div className="p-9 w-full h-full">
      <div className="justify-center p-3 h-full w-full items-center">
        <h1 className="font-semibold text-3xl py-3">
          Disease is: {diseaseInfo.disease}
        </h1>
      </div>
      <div>
        <div className="hs-accordion-group bg-E3FDFD">
          {Object.keys(accordionData).map((key, index) => {
            console.log(accordionData[key]);

            const isActive = activeAccordion === index;

            // Using contentRefs to store the reference for each accordion content
            const contentRef = (el) => {
              contentRefs.current[index] = el;
            };

            return (
              <div
                key={index}
                className={`hs-accordion ${
                  isActive ? "hs-accordion-active:border-gray-200" : ""
                }  border border-transparent rounded-md`}
              >
                <button
                  className="hs-accordion-toggle hs-accordion-active:text-blue-600 inline-flex justify-between items-center gap-x-3 w-full text-2xl font-semibold text-start text-gray-600 py-4 px-5 hover:text-black"
                  onClick={() => handleAccordionToggle(index)}
                  aria-expanded={isActive}
                  aria-controls={`hs-basic-active-bordered-collapse-${
                    index + 1
                  }`}
                >
                  {key}
                  <svg
                    className={`block size-3.5 ${isActive ? "hidden" : ""}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                  <svg
                    className={`hs-accordion-active:block size-3.5 ${
                      isActive ? "" : "hidden"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                  </svg>
                </button>
                <div
                  id={`hs-basic-active-bordered-collapse-${index + 1}`}
                  ref={contentRef}
                  style={{
                    maxHeight: isActive
                      ? `${contentRefs.current[index]?.scrollHeight}px`
                      : "0",
                    overflow: "hidden",
                    transition: "max-height 0.3s ease",
                  }}
                  role="region"
                  aria-labelledby={`hs-active-bordered-heading-${index + 1}`}
                >
                  <div className="pb-4 px-5">
                    <p className="text-gray-800">
                      <em>{accordionData[key]}</em>
                    </p>
                  </div>
                </div>
                <div className="border-b border-gray-300"></div>
              </div>
            );
          })}
        </div>
        <div className="flex space-x-7 items-center pt-7">
          <h1 className="text-[#3F72AF] text-3xl pb-2">Fun Fact</h1>
          <div
            role="button"
            onClick={() => setRefreshFunFact(refreshFunFact + 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </div>
        </div>
        <h1>{randomFunFact}</h1>
      </div>
    </div>
  );
};

export default Recommendation;
