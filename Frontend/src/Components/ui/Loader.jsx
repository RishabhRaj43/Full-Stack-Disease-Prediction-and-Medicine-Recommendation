import React from "react";

const Loader = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <div
          className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto "
          style={{ animation: "spin 3s linear infinite" }}
        ></div>
        <h2 className="light:text-zinc-900 dark:text-white mt-4">{title}...</h2>
        <p className="text-zinc-600 dark:text-zinc-400">{subtitle}</p>
      </div>
    </div>
  );
};

export default Loader;
