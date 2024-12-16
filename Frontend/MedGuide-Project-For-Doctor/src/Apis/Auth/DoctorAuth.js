import api from "../Api";

export const doctorLogin = async (formData) => {
  try {
    const response = await api.post("/api/doctor/auth/login", formData, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDoctorInfo = async () => {
  try {
    const response = await api.get("/api/doctor/auth/info", {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const doctorSignup = async (formData) => {
  try {
    const response = await api.post("/api/doctor/auth/signup", formData, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const doctorLogout = async () => {
  try {
    const response = await api.get("/api/doctor/auth/logout", {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const doctorVerify = async (emailId, otp) => {
  try {
    const res = api.post(
      "/api/doctor/auth/verify",
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

export const updateDoctor = async (formData) => {
  try {
    const res = await api.put("/api/doctor/auth/update", formData, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const onlyDoctorInfo = async () => {
  try {
    const res = await api.get(`/api/doctor/auth/get-doctor-info/${id}`, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    toast.error(error.response.data.message);
    console.log("Error in onlyDoctorInfo: ", error);

    throw error;
  }
};
