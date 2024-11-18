import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Headroom from "react-headroom";
import toast from "react-hot-toast";
import { getCurrentUser } from "../../../../Services/User/Auth/Auth";

const Navbar = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchCurrentUserDetails = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res.data.user);
      } catch (error) {
        console.log("Error in fetchCurrentUserDetails: ", error);
        toast.error(error.response.data.message);
      }
    };

    fetchCurrentUserDetails();
  }, []);
  return (
    <Headroom>
      <div className="z-50 h-16 bg-[#00A4CC] flex justify-between items-center sticky top-0">
        <div className="flex text-white">
          <Link to={"/user"}>
            <h1 className="text-3xl font-bold px-3 text-[#F5F5F5]">
              Med<span className="text-[#000]">Guide</span>
            </h1>
          </Link>
        </div>

        <div className="flex px-6 items-center">
          <ul className="flex space-x-4 text-xl items-center">
            <Link to={""} className="hover:text-[#FFF7D1]">
              Home
            </Link>
            <Link to={"search-doctors"} className="hover:text-[#FFF7D1]">
              Search Doctors
            </Link>
            <Link to={"appointments"} className="hover:text-[#FFF7D1]">
              Appointments
            </Link>
            <Link to={"user-info"}>
              <img src={user?.profilePhoto} className="w-12 h-12" alt="" />
            </Link>
          </ul>
        </div>
      </div>
    </Headroom>
  );
};

export default Navbar;
