import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useProfile from "../../../../Zustand/User/useProfile";
import toast from "react-hot-toast";
import { userLogin } from "../../../../Services/User/Auth/Auth";
import { motion } from "framer-motion";

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
      const res = await userLogin(formData);
      login(res.data.token);
      toast.success("User Logged In");
      setFormData({
        email: "",
        password: "",
      });
      navigate("/user");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/user");
    }
  }, [user, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 relative overflow-hidden"
    >
      {/* Background Animation Circles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
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

      {/* Login Form */}
      <motion.div
        className="relative flex w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full">
          <motion.h1
            className="text-4xl font-semibold text-center text-gray-800 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Login
          </motion.h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300"
                placeholder="Enter your email"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-2">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300 pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
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
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              >
                Login
              </button>
            </motion.div>
          </form>
          <motion.div
            className="mt-4 text-sm text-center text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p>
              Don't have an account?{" "}
              <Link
                to="/user/auth/signup"
                className="text-indigo-600 hover:underline"
              >
                Sign up here
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
