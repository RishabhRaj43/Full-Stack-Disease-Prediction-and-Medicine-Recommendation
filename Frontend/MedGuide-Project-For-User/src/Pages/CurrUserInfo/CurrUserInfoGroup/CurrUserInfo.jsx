import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getCurrentUser, updateUser } from "../../../Apis/Auth/Auth";
import { FaPen } from "react-icons/fa";

const CurrUserInfo = ({ user, setUser }) => {
  const [editedUser, setEditedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleEdit = () => {
    setEditedUser({ ...user });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedUser(null);
    setIsEditing(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();

      if (image) {
        formData.append("profilePhoto", editedUser?.profilePhoto);
      }

      formData.append("username", editedUser?.username);
      formData.append("email", editedUser?.email);
      formData.append("phoneNumber", editedUser?.phoneNumber);
      formData.append("gender", editedUser?.gender);

      const res = await updateUser(formData);
      toast.success(res.data.message);
      setUser({ ...editedUser });
      setEditedUser(null);
      setIsEditing(false);
    } catch (error) {
      console.log("Error updating user: ", error);
      toast.error(error.response?.data?.message || "Error updating user");
    }
    setLoading(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
    }
    setEditedUser({ ...user, profilePhoto: file });
    setIsEditing(true);
  };

  const handleImageEdit = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="flex flex-col w-full px-3">
      <div className="w-full">
        <h1 className="text-5xl font-bold mb-4">
          {isEditing ? "Edit User Information" : "User Information"}
        </h1>

        <hr className="border-t-2 border-gray-700 my-4 hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="flex gap-6 justify-between">
        <div>
          <div className="relative bg-black cursor-pointer w-56 h-56 rounded-full group">
            <img
              src={image || user?.profilePhoto}
              className="w-56 h-56 object-cover transition-all duration-300 opacity-100 group-hover:opacity-70 rounded-full"
              alt="User Profile"
            />
            <div
              className="absolute top-1/2 left-1/2 text-white text-xl font-bold transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 p-2 transform -translate-x-1/2 -translate-y-1/2 flex gap-2 items-center"
              onClick={handleImageEdit}
            >
              <h1>Edit</h1>
              <FaPen />
            </div>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <form className="space-y-4 w-full" onSubmit={handleUpdate}>
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
              value={isEditing ? editedUser.username : user.username}
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
              value={isEditing ? editedUser.email : user.email}
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
              value={isEditing ? editedUser.phoneNumber : user.phoneNumber}
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
              value={isEditing ? editedUser.gender : user.gender}
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

          {/* Buttons */}
          <div className="flex justify-end items-center mt-6 space-x-4">
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
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none"
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

export default CurrUserInfo;
