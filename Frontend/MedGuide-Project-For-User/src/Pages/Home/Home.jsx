import React from "react";
import Home1 from "./Home1";
import Home2 from "./Home2";

const Home = () => {
  return (
    <div className=" bg-gradient-to-r from-blue-500 to-teal-500 max-w-screen-xl mx-auto pt-10">
      <div className="rounded-lg mb-6">
        <Home1 />
      </div>
      <Home2 />
    </div>
  );
};

export default Home;
