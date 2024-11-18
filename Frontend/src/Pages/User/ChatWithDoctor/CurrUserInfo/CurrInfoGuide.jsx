import React from "react";

const CurrInfoGuide = ({ setSelectedTag, selectedTag }) => {
  return (
    <div className="sticky top-20 mt-20 flex flex-col justify-center items-center p-4 space-y-1">
      <div
        className={`text-2xl ${
          selectedTag === "curr-info" && "bg-cyan-400"
        } font-bold rounded-3xl p-3 cursor-pointer w-full text-center hover:bg-cyan-400`}
        onClick={() => {
          localStorage.setItem("tag", "curr-info");
          setSelectedTag("curr-info");
        }}
      >
        User Info
      </div>
      <div
        className={`text-2xl ${
          selectedTag === "fav-posts" && "bg-cyan-400"
        } font-bold rounded-3xl p-3 cursor-pointer w-full text-center hover:bg-cyan-400`}
        onClick={() => {
          localStorage.setItem("tag", "fav-posts");
          setSelectedTag("fav-posts");
        }}
      >
        Favorites Posts
      </div>
      <div
        className={`text-2xl ${
          selectedTag === "appointments" && "bg-cyan-400"
        } font-bold rounded-3xl p-3 cursor-pointer w-full text-center hover:bg-cyan-400`}
        onClick={() => {
          localStorage.setItem("tag", "appointments");
          setSelectedTag("appointments");
        }}
      >
        Appointments
      </div>
    </div>
  );
};

export default CurrInfoGuide;
