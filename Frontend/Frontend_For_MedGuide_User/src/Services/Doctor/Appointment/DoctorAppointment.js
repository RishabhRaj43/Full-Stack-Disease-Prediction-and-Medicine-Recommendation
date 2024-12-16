import { api } from "../../api";

export const getAllDoctorAppointments = async () => {
  try {
    const res = await api.get("/api/doctor/doctor-appointment/get-all-appointments", {
      withCredentials: true,
    })
    return res;
  } catch (error) {
    throw error;
  }
}