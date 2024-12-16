import toast from "react-hot-toast";
import { api } from "../../Services/api.js";
import { create } from "zustand";

const useUserData = create((set, get) => ({
  user: null,
  fetchUserData: async () => {
    try {
      const res = await api.get("/api/user/auth/current", {
        withCredentials: true,
      });
      set({ user: res.data.user });
    } catch (error) {
      console.log("Error in fetchUserData: ", error);
      toast.error(error.response.data.message);
      set({ user: null });
    }
  },
}));

export default useUserData;
