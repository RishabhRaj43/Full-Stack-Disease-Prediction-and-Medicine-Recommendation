import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useProfile from "../../../../Zustand/User/useProfile";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../../../../Components/ui/Checkbox.css";
import { userSignup } from "../../../../Services/User/Auth/Auth";
import { motion } from "framer-motion";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    gender: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const { user, login } = useProfile();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (isNaN(formData.phoneNumber)) {
      toast.error("Please enter a valid phone number");
      return;
    }
    try {
      await userSignup(formData);
      navigate(`/user/auth/signup/verify/${formData.email}`);
      setFormData({
        username: "",
        email: "",
        password: "",
        gender: "",
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 relative"
    >
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          backgroundImage: `radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.3), transparent 70%), 
                            radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.15), transparent 50%)`,
        }}
      ></motion.div>

      <motion.div
        className="absolute top-10 left-10 w-36 h-36 rounded-full bg-white opacity-20"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
      <motion.div
        className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-white opacity-30"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
      <motion.div
        className="absolute top-1/2 left-1/4 w-20 h-20 rounded-full bg-white opacity-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-28 h-28 rounded-full bg-white opacity-25"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>

      <div className="flex h-full bg-white w-1/2 rounded-3xl shadow-2xl my-4 ">
        <div className="w-full  flex ">
          <div className="w-full p-8">
            <h1 className="text-6xl font-semibold mb-8 text-black text-center">
              Sign Up
            </h1>
            <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
              <div className="w-full mb-2 lg:mb-0"></div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password.trim()}
                    onChange={handleChange}
                    className="p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className="absolute inset-y-0 right-3 flex items-center focus:outline-none"
                  >
                    {isPasswordVisible ? (
                      <img
                        className="w-5 h-5"
                        src="https://cdn-icons-png.flaticon.com/512/30/30890.png"
                        alt="Toggle visibility"
                      />
                    ) : (
                      <img
                        className="w-5 h-5"
                        src="https://cdn-icons-png.flaticon.com/512/31/31607.png"
                        alt="Toggle visibility"
                      />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative mt-1">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="confirmPassword"
                    value={confirmPassword.trim()}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    className={`p-2 w-full border  rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      confirmPassword.length > 0 &&
                      formData.password === confirmPassword
                        ? "focus:ring-green-700"
                        : confirmPassword.length === 0
                        ? "focus:ring-gray-300"
                        : "focus:ring-red-700"
                    } focus:ring-opacity-50 transition-colors duration-300 pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className={`absolute inset-y-0 bottom-5 right-3 flex items-center focus:outline-none`}
                  >
                    {isPasswordVisible ? (
                      <img
                        className="w-5 h-5"
                        src="https://cdn-icons-png.flaticon.com/512/30/30890.png"
                        alt="Toggle visibility"
                      />
                    ) : (
                      <img
                        className="w-5 h-5"
                        src="https://cdn-icons-png.flaticon.com/512/31/31607.png"
                        alt="Toggle visibility"
                      />
                    )}
                  </button>
                  {/** Tooltip */}

                  <div
                    className={`text-red-500 text-xs mt-2 transition-opacity duration-300 ease-in-out ${
                      confirmPassword.length > 0 &&
                      formData.password === confirmPassword
                        ? "opacity-0"
                        : confirmPassword.length === 0
                        ? "opacity-0"
                        : "opacity-100"
                    }`}
                  >
                    Passwords do not match!!
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <h1 className="pr-3 ">Male</h1>
                <div className="content">
                  <label className="container">
                    <input
                      type="checkbox"
                      name="gender"
                      value={"male"}
                      onChange={(e) =>
                        setFormData({ ...formData, gender: "male" })
                      }
                      checked={formData.gender === "male" ? true : false}
                    />
                    <svg viewBox="0 0 64 64" height="1.5em" width="1.5em">
                      <path
                        d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                        pathLength="575.0541381835938"
                        className="path"
                      ></path>
                    </svg>
                  </label>
                </div>
                {/*Female */}
                <h1 className="px-3 ">Female</h1>
                <div className="content">
                  <label className="container">
                    <input
                      type="checkbox"
                      name="gender"
                      value={"female"}
                      onChange={(e) =>
                        setFormData({ ...formData, gender: "female" })
                      }
                      checked={formData.gender === "female" ? true : false}
                    />
                    <svg viewBox="0 0 64 64" height="1.5em" width="1.5em">
                      <path
                        d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                        pathLength="575.0541381835938"
                        className="path"
                      ></path>
                    </svg>
                  </label>
                </div>
              </div>

              <div>
                <motion.button
                  type="submit"
                  className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                  // whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  whileFocus={{ scale: 1.05 }}
                >
                  Sign Up
                </motion.button>
              </div>
            </form>

            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>
                Already have an account?{" "}
                <Link
                  to="/user/auth/login"
                  className=" text-blue-700 hover:underline"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Signup;
