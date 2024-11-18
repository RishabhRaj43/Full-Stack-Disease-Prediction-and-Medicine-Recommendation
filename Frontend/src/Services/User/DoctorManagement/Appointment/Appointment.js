import { api } from "../../../api.js";

export const getAllAppointments = async () => {
  try {
    const response = await api.get(
      "/api/user/appointment/get-all-appointments",
      {
        withCredentials: true,
      }
    );
    return { res: response, userId: response.data.userId };
  } catch (error) {
    throw error;
  }
};

export const createAppointment = async (formData) => {
  try {
    const response = await api.post(
      "/api/user/appointment/create-appointment",
      formData,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const cancelAppointment = async (formData) => {
  try {
    const response = await api.post(
      "/api/user/appointment/cancel-appointment",
      formData,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
