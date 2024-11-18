import React from "react";
import Home2_1 from "./Home2/Home2_1";
import Home2_2 from "./Home2/Home2_2";

const Home2 = () => {
  return (
    <div className="flex w-full p-4">
      <div className="w-2/3">
        <Home2_1 />
      </div>
      <div className="w-1/3">
        <Home2_2 />
      </div>
    </div>
  );
};

export default Home2;
