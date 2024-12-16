import React from "react";
import { useNavigate } from "react-router-dom";

const CurrInfoGuide = ({ setSelectedTag, selectedTag }) => {
  const navigate = useNavigate();

  const handleTabClick = (tag) => {
    // setSelectedTag(tag);
    navigate(`/profile?tab=${tag}`);
  };

  return (
    <div className="sticky top-20 mt-10 flex flex-col justify-center items-center p-4 space-y-1">
      <div
        className={`text-2xl ${
          selectedTag === "curr-info" && "bg-cyan-400"
        } font-bold rounded-3xl p-3 cursor-pointer w-full text-center hover:bg-cyan-400`}
        onClick={() => handleTabClick("curr-info")}
      >
        User Info
      </div>
      <div
        className={`text-2xl ${
          selectedTag === "fav-posts" && "bg-cyan-400"
        } font-bold rounded-3xl p-3 cursor-pointer w-full text-center hover:bg-cyan-400`}
        onClick={() => handleTabClick("fav-posts")}
      >
        Favorites Posts
      </div>
      <div
        className={`text-2xl ${
          selectedTag === "appointments" && "bg-cyan-400"
        } font-bold rounded-3xl p-3 cursor-pointer w-full text-center hover:bg-cyan-400`}
        onClick={() => handleTabClick("appointments")}
      >
        Appointments
      </div>
    </div>
  );
};

export default CurrInfoGuide;
