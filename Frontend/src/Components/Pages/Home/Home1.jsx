import React from "react";
// import "/Medical.png";
import { Typewriter } from "react-simple-typewriter";

const Home1 = () => {
  return (
    <div className="flex">
      <div className=" w-1/2 z-1 h-screen left-0 p-10 flex flex-col justify-center bottom-6">
        <h1 className="text-7xl font-bold mb-4">Welcome to MedGuide</h1>
        {/* <p className="text-sm mb-4">Your Health Companion, One Click Away</p> */}

        <p className="text-3xl text-gray-600">
          Predict your{" "}
          <span className="font-bold text-blue-500">
            <Typewriter
              words={["health", "well-being", "care"]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={100}
              deleteSpeed={95}
              delaySpeed={1000}
            />
          </span>{" "}
          with ease...
        </p>

        <p className="mt-4 text-xs items-center">
          {/* MedGuide empowers you to take control of your health. Simply enter
          your symptoms, and our advanced algorithm will guide you toward
          potential diagnoses. Whether you're seeking peace of mind or just
          curious, MedGuide is here to provide trusted, personalized insights. */}
          At MedGuide, we simplify your health journey. Input your symptoms, and let our intelligent system offer potential insights, guiding you toward a clearer understanding of your well-being.
        </p>
      </div>

      <img
        className="h-screen absolute right-0 object-cover -z-10"
        src="/Medical3.gif"
        alt=""
      />
    </div>
  );
};

export default Home1;
