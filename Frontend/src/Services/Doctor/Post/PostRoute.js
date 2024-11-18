import { api } from "../../api";

export const createPost = async (formData) => {
  try {
    const response = await api.post(
      "/api/doctor/doctor-post/create-post",
      formData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await api.post("/api/doctor/doctor-post/delete-post", {
      postId,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
