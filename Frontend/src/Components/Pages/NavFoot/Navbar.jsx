import React from "react";
import useProfile from "../../../Zustand/Profile";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Navbar = () => {
  const { isLoggedIn, logout } = useProfile();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/logout", {
        withCredentials: true,
      });
      logout();
      toast.success("User Logged Out");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };

  return (
    <div className="z-50 h-16 bg-[#00A4CC] flex justify-between items-center sticky top-0">
      <div className="flex text-white">
        <Link to={"/"}>
          <h1 className="text-3xl font-bold px-3 text-[#F5F5F5]">
            Med<span className="text-[#000]">Guide</span>
          </h1>
        </Link>
      </div>

      <div className="flex px-6">
        <ul className="flex space-x-4 text-xl items-center">
          <Link to={"/"} className="hover:text-[#FFF7D1]">
            Home
          </Link>
          <Link to={"/prediction"} className="hover:text-[#FFF7D1]">
            Prediction
          </Link>
          <Link to={"/about"} className="hover:text-[#FFF7D1]">
            About Us
          </Link>
          {isLoggedIn() ? (
            <Link to={"/"} onClick={handleLogout}>
              <button className="bg-[#3C3D37] w-[100px] h-[40px] flex items-center justify-center text-white px-4 py-2 text-lg rounded-3xl transition duration-300 transform hover:bg-[#181C14] active:scale-95">
                Logout
              </button>
            </Link>
          ) : (
            <Link to={"/login"}>
              <button className="bg-[#3C3D37] w-[100px] h-[40px] flex items-center justify-center text-white px-4 py-2 text-lg rounded-3xl transition duration-300 transform hover:bg-[#181C14] active:scale-95">
                Login
              </button>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
