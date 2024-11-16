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
      name
    ) => {
      if (!name) return;
      localStorage.setItem("token_user", name);
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
