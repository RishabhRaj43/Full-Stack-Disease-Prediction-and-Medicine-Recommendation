import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useProfile from "../../../Zustand/Profile";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const { user, login } = useProfile();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/login",
        formData,
        {
          withCredentials: true,
        }
      );
      login(res.data.token);
      toast.success("User Logged In");
      setFormData({
        email: "",
        password: "",
      });
      navigate("/");
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data);
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
            src="https://img.freepik.com/premium-photo/sign-login-website-page_406811-99939.jpg?w=740"
            alt=""
          />
        </div>
        <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
          <div className="max-w-md w-full p-6">
            <h1 className="text-6xl font-semibold mb-6 text-black text-center">
              Login
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
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
                    value={formData.password}
                    onChange={handleChange}
                    className="p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 pr-10 z-10"
                  />
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none z-10"
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
                <button
                  type="submit"
                  className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>
                Want to create an account?{" "}
                <Link to="/signup" className="text-[#000000] hover:underline">
                  Signup here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
