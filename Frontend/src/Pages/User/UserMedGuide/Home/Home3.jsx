import React, { useState, useRef } from "react";

const Home3 = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const contentRefs = useRef([]);

  const accordionData = {
    "How Accurate The Predictions, Recommendations and Medications Are?":
      "Our system utilizes advanced algorithms and expert input to provide the most accurate recommendations possible. However, results may vary depending on individual cases.",
    "How Reliable Are The Doctors Here?":
      "All our doctors are highly qualified, certified professionals with years of experience in their respective fields. Your health and trust are our priorities.",
    "Are Doctors Available 24/7?":
      "While our doctors aim to provide the best care, their availability is subject to schedules and emergencies. However, we ensure round-the-clock support for urgent queries.",
  };

  const handleAccordionToggle = (index) => {
    if (activeAccordion === index) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(index);
    }
  };

  return (
    <div className="px-24 py-3 mb-32">
      <h1 className="text-7xl text-center py-7 font-bold mb-4">FAQs</h1>
      <div className="hs-accordion-group bg-E3FDFD">
        {Object.keys(accordionData).map((key, index) => {
          const isActive = activeAccordion === index;
          const contentRef = useRef();

          return (
            <div
              key={index}
              className={`hs-accordion ${
                isActive ? "hs-accordion-active:border-gray-200" : ""
              }  border border-transparent rounded-md`}
            >
              <button
                className="hs-accordion-toggle hs-accordion-active:text-blue-600 inline-flex justify-between items-center gap-x-3 w-full text-xl font-semibold text-start text-gray-600 py-4 px-5 hover:text-black"
                onClick={() => handleAccordionToggle(index)}
                aria-expanded={isActive}
                aria-controls={`hs-basic-active-bordered-collapse-${index + 1}`}
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
                    ? `${contentRef.current?.scrollHeight}px`
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
              <div className=" border-b border-gray-300"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home3;
