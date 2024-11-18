import React, { useEffect, useState } from "react";
import CurrUserInfo from "./CurrUserInfoGroup/CurrUserInfo";
import CurrInfoGuide from "./CurrInfoGuide";
import { getCurrentUser } from "../../../../Services/User/Auth/Auth";
import toast from "react-hot-toast";
import CurrFavPosts from "./CurrUserInfoGroup/CurrFavPosts";
import axios from "axios";
import CurrUserAppointments from "./CurrUserInfoGroup/CurrUserAppointments";

const MainCurrUserInfo = () => {
  const [selectedTag, setSelectedTag] = useState(
    localStorage.getItem("tag") || "curr-info"
  );
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
  });
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
    <div className="flex m-7 bg-slate-200 rounded-3xl">
      <div className="w-1/3 sticky">
        <CurrInfoGuide
          setSelectedTag={setSelectedTag}
          selectedTag={selectedTag}
        />
      </div>
      <div className="w-2/3">
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
