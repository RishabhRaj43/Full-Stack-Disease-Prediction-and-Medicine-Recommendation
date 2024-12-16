import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import useProfile from "../../../../Zustand/User/useProfile";
import { userVerify } from "../../../../Services/User/Auth/Auth";
import { motion } from "framer-motion";

const Verify = () => {
  const navigate = useNavigate();
  const { emailId } = useParams();
  const [otp, setOtp] = useState("");
  const { login } = useProfile();

  const inputRefs = useRef([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await userVerify(emailId, otp);
      login(res.data.token);
      toast.success("User Logged In");
      setTimeout(() => {
        navigate("/user");
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    toast.success("OTP sent to your email");
    return () => {
      toast.dismiss();
    };
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return;

    const newOtp = otp.split("");
    newOtp[index] = value;
    setOtp(newOtp.join(""));

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("Text").slice(0, 6);
    if (/[^0-9]/.test(pastedText)) return;

    const otpArray = pastedText.split("").slice(0, 6);
    setOtp(otpArray.join(""));

    otpArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });

    inputRefs.current[otpArray.length]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 relative"
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

      <div className="flex flex-col z-10 px-6 py-12">
        <motion.div
          className="w-full max-w-md bg-white p-8 shadow-xl rounded-lg relative z-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl font-semibold text-gray-900 text-center mb-6">
            Verify OTP
          </h1>
          <p className="text-center text-gray-600 mb-4">
            We have sent an OTP to your email. Please enter it below to proceed.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-6 gap-2">
              {Array(6)
                .fill("")
                .map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={otp[index] || ""}
                    onChange={(e) => handleChange(e, index)}
                    onPaste={handlePaste}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="w-full p-4 border-2 border-gray-300 rounded-md text-center text-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                ))}
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Verify
            </button>
          </form>

          <div className="mt-4 text-sm text-center text-gray-600">
            <p>
              Don't have an account?{" "}
              <Link
                to="/user/auth/signup"
                className="text-indigo-600 hover:underline"
              >
                Sign up here
              </Link>
            </p>
            <p>
              Already have an account?{" "}
              <Link
                to="/user/login"
                className="text-indigo-600 hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Verify;
