import { create } from "zustand";

const useProfile = create((set) => {
  const getUser = () => {
    if (
      localStorage.getItem("user")
      // && localStorage.getItem("senderId")
    ) {
      return localStorage.getItem("user");
    }
    return null;
  };

  return {
    user: getUser(),
    login: (
      name
      // , senderId
    ) => {
      if (!name) return;
      localStorage.setItem("user", name);
      // localStorage.setItem("senderId", senderId);
      set({ user: getUser() });
    },
    logout: () => {
      localStorage.removeItem("user");
      // localStorage.removeItem("senderId");
      set({ user: getUser() });
    },
    isLoggedIn: () => !!getUser(),
  };
});

export default useProfile;
