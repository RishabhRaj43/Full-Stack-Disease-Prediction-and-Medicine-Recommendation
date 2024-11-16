import React from "react";
import Home1 from "./Home1";
import Home2 from "./Home2";
import Home3 from "./Home3";

const Home = () => {
  return <div className="h-screen">
    <div className="rounded-lg">
    <Home1 />
    </div>
    <Home2 />
    <Home3 />
  </div>;
};

export default Home;
