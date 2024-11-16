import { api } from "../../api.js";

export const userLogin = async (formData) => {
  try {
    const response = await api.post("/api/user/auth/login", formData);
    return response;
  } catch (error) {
    console.log("Login Error: ", error);
  }
};

export const userSignup = async (formData) => {
  try {
    const response = await api.post("/api/user/auth/signup", formData);
    return response;
  } catch (error) {
    console.log("Signup Error: ", error);
  }
};

export const userLogout = async () => {
  try {
    const response = await api.get("/api/user/auth/logout");
    return response;
  } catch (error) {
    console.log("Logout Error: ", error);
  }
};

export const userVerify = async (emailId, otp) => {
  try {    
    const res = api.post("/api/user/auth/verify", {
      email: emailId,
      verificationCode: otp,
    });
    return res;
  } catch (error) {
    console.log("Verify Error: ", error);
  }
};
