import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CurrUserInfo from "./CurrUserInfoGroup/CurrUserInfo";
import CurrInfoGuide from "./CurrInfoGuide";
import CurrFavPosts from "./CurrUserInfoGroup/CurrFavPosts";
import CurrUserAppointments from "./CurrUserInfoGroup/CurrUserAppointments";
import { getCurrentUser } from "../../Apis/Auth/Auth.js";
import toast from "react-hot-toast";

const MainCurrUserInfo = () => {
  const [searchParams] = useSearchParams();
  const [selectedTag, setSelectedTag] = useState("curr-info");
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
  });

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setSelectedTag(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchCurrentUserDetails = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res.data.user);
      } catch (error) {
        console.log("Error in fetchCurrentUserDetails: ", error);
        toast.error(
          error.response?.data?.message || "Error fetching user data"
        );
      }
    };

    fetchCurrentUserDetails();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 shadow-lg">
      <div className="w-1/3 sticky px-6">
        <CurrInfoGuide
          setSelectedTag={setSelectedTag}
          selectedTag={selectedTag}
        />
      </div>
      <div className="w-full p-6">
        {selectedTag === "curr-info" && (
          <CurrUserInfo user={user} setUser={setUser} />
        )}
        {selectedTag === "fav-posts" && <CurrFavPosts />}
        {selectedTag === "appointments" && <CurrUserAppointments />}
      </div>
    </div>
  );
};

export default MainCurrUserInfo;
