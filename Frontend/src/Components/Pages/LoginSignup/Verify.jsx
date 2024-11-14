import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import useProfile from "../../../Zustand/Profile";
import axios from "axios";

const Verify = () => {
  const navigate = useNavigate();
  const { emailId } = useParams();
  const [otp, setOtp] = useState("");
  const { login } = useProfile();
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/verify",
        {
          email: emailId,
          verificationCode: otp,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);

      login(res.data.token);
      toast.success("User Logged In");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    toast.success("OTP sent to your email");
    return () => {
      toast.dismiss();
    };
  }, []);

  return (
    <div>
      <div className="flex h-screen">
        <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
          <img
            className="w-4/5"
            src="https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-online-registration_516790-1805.jpg?w=740"
            alt=""
          />
        </div>
        <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
          <div className="max-w-md w-full p-6">
            <h1 className="text-6xl font-semibold mb-6 text-black text-center">
              Verify OTP
            </h1>
            <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
              <div className="w-full lg:w-1/2 mb-2 lg:mb-0"></div>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                placeholder="Enter OTP"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="text-2xl p-2 mb-4 ring-1 ring-gray-900 w-full"
              />
              <button className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">
                Verify
              </button>
            </form>

            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-[#000000] hover:underline">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
