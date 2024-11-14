import React from "react";

const Card = ({ disease }) => {
  return (
    <div className="relative cursor-pointer h-60 w-40 bg-white m-3 overflow-hidden rounded-lg group">
      {/* <img
        src={disease.image}
        alt=""
        className="h-full w-full object-cover transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-70"
      /> */}
      <h1 className="absolute left-0 w-full flex bottom-0 justify-center text-black text-xl font-bold  bg-opacity-30 transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
        {disease.name}
      </h1>
    </div>
  );
};

export default Card;
