import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { doctorSignup } from "../../Apis/Auth/DoctorAuth";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const DoctorSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    phoneNumber: "",
    specialization: [],
    experience: "",
    fees: "",
    availability: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.specialization.length || !formData.availability.length) {
      toast.error(
        "Please select at least one specialization and availability."
      );
      return;
    }
    if (isNaN(formData.fees)) return toast.error("Fees must be a number");
    try {
      const res = await doctorSignup(formData);
      toast.success(res.data.message);
      navigate(`verify/${formData.email}`);
      setFormData({
        username: "",
        email: "",
        password: "",
        gender: "",
        phoneNumber: "",
        specialization: [],
        experience: "",
        fees: "",
        availability: [],
      });
    } catch (error) {
      console.log("Error in handleSubmit: ", error);
      toast.error("Error signing up!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-200 to-pink-500">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl my-8 mx-auto p-6 bg-white shadow-lg rounded-lg mt-10"
      >
        <h2 className="text-6xl font-semibold text-center text-gray-800 mb-6">
          Doctor Signup
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
          <motion.input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="flex gap-6">
            <label className="flex items-center text-gray-800">
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={handleInputChange}
                className="mr-2"
                required
              />
              Male
            </label>
            <label className="flex items-center text-gray-800">
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={handleInputChange}
                className="mr-2"
                required
              />
              Female
            </label>
          </div>
          <motion.input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
          <div>
            <label className="block font-semibold text-gray-800 mb-2">
              Specialization
            </label>
            <div className="flex gap-2">
              <motion.input
                type="text"
                id="specializationInput"
                placeholder="Add specialization"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const value = e.target.value.trim();
                    if (value && !formData.specialization.includes(value)) {
                      setFormData((prev) => ({
                        ...prev,
                        specialization: [...prev.specialization, value],
                      }));
                      e.target.value = "";
                    } else if (formData.specialization.includes(value)) {
                      toast.error("Specialization already added!");
                    }
                  }
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
              />
              <button
                type="button"
                className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 *: text-white px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-green-600 hover:via-green-500 hover:to-green-400 transition duration-300"
                onClick={() => {
                  const input = document.getElementById("specializationInput");
                  const value = input.value.trim();
                  if (value && !formData.specialization.includes(value)) {
                    setFormData((prev) => ({
                      ...prev,
                      specialization: [...prev.specialization, value],
                    }));
                    input.value = "";
                  } else if (formData.specialization.includes(value)) {
                    toast.error("Specialization already added!");
                  }
                }}
              >
                Add
              </button>
            </div>
            <ul className="mt-2 space-y-2">
              {formData.specialization.map((spec, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center text-gray-800"
                >
                  {spec}
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        specialization: prev.specialization.filter(
                          (_, i) => i !== index
                        ),
                      }))
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    <MdDelete />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <motion.input
            type="text"
            name="experience"
            placeholder="Experience (e.g., 10+ yrs)"
            value={formData.experience}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.input
            type="tel"
            name="fees"
            placeholder="Fees"
            value={formData.fees}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          />
          <div>
            <label className="block font-semibold text-gray-800 mb-2">
              Availability
            </label>
            <div className="flex gap-2">
              <motion.input
                type="time"
                id="timeInput"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const time = e.target.value.trim();
                    if (time && !formData.availability.includes(time)) {
                      setFormData((prev) => ({
                        ...prev,
                        availability: [...prev.availability, time],
                      }));
                      e.target.value = "";
                    } else if (formData.availability.includes(time)) {
                      toast.error("This time is already added!");
                    }
                  }
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
              <button
                type="button"
                className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-green-600 hover:via-green-500 hover:to-green-400 transition duration-300"
                onClick={() => {
                  const input = document.getElementById("timeInput");
                  const time = input.value.trim();
                  if (time && !formData.availability.includes(time)) {
                    setFormData((prev) => ({
                      ...prev,
                      availability: [...prev.availability, time],
                    }));
                    input.value = "";
                  } else if (formData.availability.includes(time)) {
                    toast.error("This time is already added!");
                  }
                }}
              >
                Add
              </button>
            </div>
            <ul className="mt-2 space-y-2">
              {formData.availability.map((time, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center text-gray-800"
                >
                  {time}
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        availability: prev.availability.filter(
                          (_, i) => i !== index
                        ),
                      }))
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    <MdDelete />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Signup
          </button>
        </form>
        <Link
          to="/auth/login"
          className="flex text-zinc-400 hover:text-zinc-900"
        >
          <p className="text-md mt-4">Already have an account?</p>
        </Link>
      </motion.div>
    </div>
  );
};

export default DoctorSignup;
