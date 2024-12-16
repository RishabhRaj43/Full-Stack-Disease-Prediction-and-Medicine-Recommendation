import api from "../api";

const getCookie = async () => {
  try {
    const response = await api.get("/api/user/auth/cookie", {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export default getCookie;
