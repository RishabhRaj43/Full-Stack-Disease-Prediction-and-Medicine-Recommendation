import { api } from "../../api";

export const createPost = async (formData) => {
  try {
    const response = await api.post(
      "/api/doctor/doctor-post/create-post",
      formData,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await api.post(
      "/api/doctor/doctor-post/delete-post",
      {
        postId,
      },
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getPost = async () => {
  try {
    const response = await api.get("/api/doctor/doctor-post/", {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
