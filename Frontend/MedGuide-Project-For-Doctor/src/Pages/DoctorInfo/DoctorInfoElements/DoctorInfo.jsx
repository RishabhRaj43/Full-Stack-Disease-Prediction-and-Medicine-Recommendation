import React, { useState } from "react";
import toast from "react-hot-toast";
import { updateDoctor } from "../../../Apis/Auth/DoctorAuth";
import { FaPenSquare } from "react-icons/fa";

const DoctorInfo = ({ doctor, setDoctor }) => {
  const [editedDoctor, setEditedDoctor] = useState(doctor);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDoctor({ ...editedDoctor, [name]: value });
  };

  const handleEdit = () => {
    setEditedDoctor({ ...doctor });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedDoctor(null);
    setIsEditing(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (isNaN(editedDoctor.fees)) {
      return toast.error("Fees must be a number");
    }

    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("username", editedDoctor.username);
      formData.append("email", editedDoctor.email);
      formData.append("phoneNumber", editedDoctor.phoneNumber);

      if (
        typeof editedDoctor.specialization === "string" &&
        editedDoctor.specialization
      ) {
        const specializationArray = editedDoctor.specialization
          .split(",")
          .map((item) => item.trim());

        specializationArray.forEach((spec) => {
          formData.append("specialization[]", spec);
        });
      } else if (Array.isArray(editedDoctor.specialization)) {
        editedDoctor.specialization.forEach((spec) => {
          formData.append("specialization[]", spec);
        });
      }
      formData.append("experience", editedDoctor.experience);
      formData.append("fees", editedDoctor.fees);

      if (image) {
        formData.append("profilePhoto", editedDoctor.profilePhoto);
      }

      const res = await updateDoctor(formData);

      toast.success(
        res.data.message || "Doctor information updated successfully"
      );
      setDoctor(res.data.doctor);
      setEditedDoctor(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating doctor: ", error);
      toast.error(error.response?.data?.message || "Error updating doctor");
    }

    setLoading(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
    }
    setEditedDoctor({ ...doctor, profilePhoto: file });
    setIsEditing(true);
  };

  const handleImageEdit = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="flex my-9 justify-around top-0 w-full min-h-screen">
      <div className="relative cursor-pointer bg-black rounded-full w-96 h-96 group">
        <img
          src={image || doctor?.profilePhoto}
          className="w-full h-full object-cover transition-all duration-300 opacity-100 group-hover:opacity-70 rounded-full"
          alt="Doctor Profile"
        />
        <div
          className="absolute top-1/2 left-1/2 text-white text-3xl font-bold transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 p-2 transform -translate-x-1/2 -translate-y-1/2 flex gap-2 items-center"
          onClick={handleImageEdit}
        >
          <h1>Edit</h1>
          <FaPenSquare size="1.5rem" />{" "}
          {/* Using FaPenSquare from react-icons */}
        </div>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <div className="w-full flex-1 max-w-lg rounded-lg">
        <h1 className="text-5xl font-bold mb-4">
          {isEditing ? "Edit Doctor Information" : "Doctor Information"}
        </h1>
        <hr className="border-t-2 border-gray-700 my-4" />

        <form className="space-y-4" onSubmit={handleUpdate}>
          {/* Username */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={isEditing ? editedDoctor.username : doctor.username}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 focus:outline-none"
              readOnly={!isEditing}
            />
          </div>

          {/* Email */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={isEditing ? editedDoctor.email : doctor.email}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 focus:outline-none"
              readOnly={!isEditing}
            />
          </div>

          {/* Phone Number */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={isEditing ? editedDoctor.phoneNumber : doctor.phoneNumber}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 focus:outline-none"
              readOnly={!isEditing}
            />
          </div>

          {/* Gender */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="gender"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={isEditing ? editedDoctor.gender : doctor.gender}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 focus:outline-none"
              disabled={!isEditing}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Specialization */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="specialization"
            >
              Specialization
            </label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              value={
                isEditing
                  ? editedDoctor.specialization
                  : doctor?.specialization?.join(", ") || ""
              }
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 focus:outline-none"
              readOnly={!isEditing}
            />
          </div>

          {/* Experience */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="experience"
            >
              Experience
            </label>
            <input
              type="text"
              id="experience"
              name="experience"
              value={isEditing ? editedDoctor.experience : doctor.experience}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 focus:outline-none"
              readOnly={!isEditing}
            />
          </div>

          {/* Fees */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="fees"
            >
              Fees
            </label>
            <input
              type="tel"
              id="fees"
              name="fees"
              value={isEditing ? editedDoctor.fees : doctor.fees}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 focus:outline-none"
              readOnly={!isEditing}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end items-center mt-6">
            {!isEditing ? (
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                onClick={handleEdit}
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none mr-2"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorInfo;
