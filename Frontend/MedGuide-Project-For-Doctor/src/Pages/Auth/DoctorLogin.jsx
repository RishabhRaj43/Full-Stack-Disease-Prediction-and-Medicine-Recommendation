import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { doctorLogin } from "../../Apis/Auth/DoctorAuth";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useDoctorProfile from "../../Zustand/useDoctorProfile";

const DoctorLogin = () => {
  const {login} = useDoctorProfile();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await doctorLogin({ email, password });
      login(res.data.token);
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      console.log("Error in handleLogin: ", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-10 text-center w-full max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Doctor Login</h1>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          {/* Password Input */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          <motion.button
            type="submit"
            className="w-full py-3 px-6 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transform hover:scale-105 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </form>

        <div className="mt-4 flex justify-between">
          <Link to={"/auth/signup"}>
            <p className="text-gray-400 hover:text-gray-800" >Don't have an account?</p>
          </Link>
          <a
            href="/forgot-password"
            className="text-blue-500 hover:text-blue-700"
          >
            Forgot your password?
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default DoctorLogin;
