import toast from "react-hot-toast";
import api from "../Apis/api";
import { create } from "zustand";
import getCookie from "../Apis/Cookies/GetCookie";

const useUserData = create((set, get) => ({
  user: null,
  fetchUserData: async () => {
    try {
      const res = await api.get("/api/user/auth/current", {
        withCredentials: true,
      });
      const token = await getCookie();
      localStorage.setItem("token_user", token.data.cookie);
      set({ user: res.data.user });
    } catch (error) {
      console.log("Error in fetchUserData: ", error);
      toast.error(error.response.data.message);
      set({ user: null });
    }
  },
}));

export default useUserData;
