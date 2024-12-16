import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useUserData from "../Zustand/useUserData";
import Loader from "../Components/UI/Loader";

const ProtectRoute = () => {
  const { user, fetchUserData } = useUserData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!user) {
        await fetchUserData();
      }

      const token = localStorage.getItem("token_user");
      if (!token) {
        window.open(import.meta.env.VITE_LOGIN, "_self");
      }

      setTimeout(() => {
        setLoading(false);
      }, 0);
    };

    checkAuthentication();
  }, [user, fetchUserData]);

  if (loading) {
    return (
      <div className="w-full flex-col h-screen bg-zinc-800 flex justify-center items-center">
        <Loader />
        <p className="text-white text-xl font-semibold tracking-wide opacity-90">
          Hang tight! We’re just making sure everything’s perfect for you...
        </p>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectRoute;
