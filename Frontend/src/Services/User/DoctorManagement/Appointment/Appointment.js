import { api } from "../../../api.js";

export const getAllAppointments = async (status=null,date) => {
  try {
    const response = await api.post(
      "/api/user/appointment/get-all-appointments",{status,date},
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

export const cancelAppointment = async (appointmentId) => {
  try {
    const response = await api.post(
      "/api/user/appointment/cancel-appointment",
      {
        appointmentId,
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
