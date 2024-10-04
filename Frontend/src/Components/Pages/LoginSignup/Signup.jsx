import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useProfile from "../../../Zustand/Profile";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../../Ui/Checkbox.css";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
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
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/signup",
        formData,
        {
          withCredentials: true,
        }
      );
      login(res.data.token);
      toast.success("User Created");
      setFormData({
        username: "",
        email: "",
        password: "",
        gender: "",
      });
    } catch (error) {
      console.log(error.response);
      toast.error("Internal Server Error");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

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
              Sign Up
            </h1>
            <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
              <div className="w-full lg:w-1/2 mb-2 lg:mb-0"></div>
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
                      formData.password === confirmPassword
                        ? "focus:ring-green-700"
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
                      formData.password === confirmPassword
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
                <button
                  type="submit"
                  className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                >
                  Sign Up
                </button>
              </div>
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

export default Signup;
