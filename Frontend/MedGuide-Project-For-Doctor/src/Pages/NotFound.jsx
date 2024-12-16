import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const [sencond, setSecond] = useState(5);

  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      setSecond((prev) => prev - 1);
    }, 1000);

    if(sencond <= 0){
      navigate("/");
    }

    return () => {
      clearTimeout(timer);
    };
  });
  return (
    <div className="w-full h-screen flex pt-5 m-0 flex-col items-center bg-[#f8fdfe]">
      <img
        src="https://img.freepik.com/premium-vector/404-found-error-man-stands-monitor-that-shows-404-error_491047-100.jpg?w=740"
        alt="404 page Not Found"
        className="h-[70vh] my-0 py-0"
      />
      <p className="text-3xl text-center">
        Redirecting in <span className="text-[#FF76CE]">{sencond} seconds...</span>
      </p>
    </div>
  );
};

export default NotFound;
