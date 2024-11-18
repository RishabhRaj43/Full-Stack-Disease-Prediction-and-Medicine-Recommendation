import { api } from "../../api.js";

export const doctorLogin = async (formData) => {
  try {
    const response = await api.post("/api/doctor/auth/login", formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const doctorSignup = async (formData) => {
  try {
    const response = await api.post("/api/doctor/auth/signup", formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const doctorLogout = async () => {
  try {
    const response = await api.get("/api/doctor/auth/logout");
    return response;
  } catch (error) {
    throw error;
  }
};

export const doctorVerify = async (emailId, otp) => {
  try {
    const res = api.post("/api/doctor/auth/verify", {
      email: emailId,
      verificationCode: otp,
    });
    return res;
  } catch (error) {
    throw error;
  }
};
