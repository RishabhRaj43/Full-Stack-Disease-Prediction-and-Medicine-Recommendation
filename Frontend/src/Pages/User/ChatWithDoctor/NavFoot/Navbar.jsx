import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Headroom from "react-headroom";

const Navbar = () => {
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

        <div className="flex px-6">
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
            <Link to={"userInfo"}>
              <button className="rounded-full flex items-center justify-center  p-4 h-9 bg-cyan-300 hover:bg-cyan-400">
                <h1 className="p-2 ">Profile</h1>
              </button>
            </Link>
          </ul>
        </div>
      </div>
    </Headroom>
  );
};

export default Navbar;
