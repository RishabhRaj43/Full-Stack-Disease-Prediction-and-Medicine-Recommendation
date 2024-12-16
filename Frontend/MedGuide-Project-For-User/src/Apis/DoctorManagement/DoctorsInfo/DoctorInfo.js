import toast from "react-hot-toast";
import api from "../../api";

export const getMostLikedDoctors = async () => {
  try {
    const res = api.get(`/api/user/doctor-info/get-most-liked-doctors`, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAllDoctors = async (speciality = null) => {
  try {
    const res = await api.post(
      `/api/user/doctor-info/get-all-doctors`,
      { speciality },
      {
        withCredentials: true,
      }
    );

    return { res, userId: res.data.userId };
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
    throw error;
  }
};

export const likeADoctor = async (doctorId) => {
  try {
    const res = await api.post(
      "/api/user/doctor-info/like-doctor",
      { doctorId },
      { withCredentials: true }
    );
    return { res: res, userId: res.data.userId };
  } catch (error) {
    throw error;
  }
};

export const unlikeADoctor = async (doctorId) => {
  try {
    const res = await api.post(
      "/api/user/doctor-info/unlike-doctor",
      { doctorId },
      { withCredentials: true }
    );
    return { res, userId: res.data.userId };
  } catch (error) {
    throw error;
  }
};

export const getDoctorInfo = async (doctorId) => {
  try {
    const res = await api.get(
      `/api/user/doctor-info/get-doctor-info/${doctorId}`,
      { withCredentials: true }
    );
    return { res: res, userId: res.data.userId };
  } catch (error) {
    throw error;
  }
};

export const getAllCategories = async (limit) => {
  try {
    const res = await api.get(
      "/api/user/doctor-info/get-all-categories?limit=" + limit,
      {
        withCredentials: true,
      }
    );
    return { res, userId: res.data.userId };
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message);
    throw error;
  }
};
