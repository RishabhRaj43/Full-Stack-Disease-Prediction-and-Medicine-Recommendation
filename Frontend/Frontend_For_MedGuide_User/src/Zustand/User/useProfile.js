import { create } from "zustand";

const useProfile = create((set) => {
  const getUser = () => {
    if (
      localStorage.getItem("token_user")
    ) {
      return localStorage.getItem("token_user");
    }
    return null;
  };

  return {
    user: getUser(),
    login: (
      token
    ) => {
      if (!token) return;
      localStorage.setItem("token_user", token);
      set({ user: getUser() });
    },
    logout: () => {
      localStorage.removeItem("token_user");
      set({ user: getUser() });
    },
    isLoggedIn: () => !!getUser(),
  };
});

export default useProfile;
