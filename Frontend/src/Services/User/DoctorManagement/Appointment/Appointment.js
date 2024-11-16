import {api} from "../../../api.js";

export const getAllAppointments = async () => {
  try {
    const response = await api.get(
      "/api/user/appointment/get-all-appointments",
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log("Get All Appointments Error: ", error);
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
    console.log("Create Appointment Error: ", error);
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
    console.log("Cancel Appointment Error: ", error);
  }
};
