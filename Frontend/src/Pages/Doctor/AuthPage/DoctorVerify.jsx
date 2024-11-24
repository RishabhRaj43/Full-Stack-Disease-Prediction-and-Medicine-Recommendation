import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { doctorVerify } from "../../../Services/Doctor/Auth/DoctorAuth";
import useDoctorProfile from "../../../Zustand/Doctor/useDoctorProfile";

const DoctorVerify = () => {
  const {login} = useDoctorProfile();
  const navigate = useNavigate();
  const { emailId } = useParams();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]*$/.test(value)) return; // Allow only numeric input

    setOtp((prev) =>
      prev.map((digit, i) => (i === index ? value.slice(0, 1) : digit))
    );

    // Automatically move to the next input if a digit is entered
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      return;
    }

    try {
      const res = await doctorVerify(emailId, otpValue);
      login(res.data.token)
      toast.success("Signup successful!");
      navigate("/doctor");
    } catch (error) {
      console.log("Error in handleSubmit: ", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Verify OTP</h2>
        <p className="text-gray-600 text-center mb-6">
          Enter the 6-digit OTP sent to your registered email or phone.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="flex gap-2 mb-6">
            {otp.map((_, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength="1"
                value={otp[index]}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 font-bold text-lg"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorVerify;
