import { api } from "../../api.js";

export const getCurrentUser = async () => {
  try {
    const res = await api.get("/api/user/auth/current", {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    console.log("Get Current User Error: ", error);
  }
};
export const userLogin = async (formData) => {
  try {
    const response = await api.post("/api/user/auth/login", formData, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const userSignup = async (formData) => {
  try {
    const response = await api.post("/api/user/auth/signup", formData, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (formData) => {
  try {
    const res = await api.post("/api/user/auth/update", formData, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const userLogout = async () => {
  try {
    const response = await api.get("/api/user/auth/logout", {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const userVerify = async (emailId, otp) => {
  try {
    const res = api.post(
      "/api/user/auth/verify",
      {
        email: emailId,
        verificationCode: otp,
      },
      { withCredentials: true }
    );
    return res;
  } catch (error) {
    throw error;
  }
};
