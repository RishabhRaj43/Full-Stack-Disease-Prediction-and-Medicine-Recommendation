import React, { useEffect } from "react";
import Home1 from "./Home1";
import Home3 from "./Home3";
import Home_2 from "./Home_2";

const Home = () => {
  return (
    <div className="flex bg-gradient-to-r from-blue-500 to-purple-600 flex-col">
      <Home1 />
      <Home_2 />
      <Home3 />
    </div>
  );
};

export default Home;
