import React, { useState } from "react";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { doctorSignup } from "../../../Services/Doctor/Auth/DoctorAuth";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import framer-motion

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl my-8 mx-auto p-6 bg-gradient-to-r from-blue-100 via-purple-200 to-pink-200 shadow-lg rounded-lg mt-10"
    >
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Doctor Signup
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Username */}
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

        {/* Email */}
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

        {/* Password */}
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

        {/* Gender */}
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

        {/* Phone Number */}
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

        {/* Specialization */}
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
              className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition duration-300"
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
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Experience */}
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

        {/* Fees */}
        <motion.input
          type="number"
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

        {/* Availability */}
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
              className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition duration-300"
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
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 focus:outline-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Signup
        </motion.button>
      </form>
      <Link to={"/doctor/auth/login"}>
        <p className="text-gray-900 mt-4 hover:underline">
          Don't have an account?
        </p>
      </Link>
    </motion.div>
  );
};

export default DoctorSignup;
