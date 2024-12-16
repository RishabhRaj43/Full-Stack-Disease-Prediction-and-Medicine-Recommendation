import { create } from "zustand";

const useDoctorProfile = create((set) => {
  const getDoctor = () => {
    if (localStorage.getItem("token_doctor")) {
      return localStorage.getItem("token_doctor");
    }
    return null;
  };

  return {
    user: getDoctor(),
    login: (name) => {
      if (!name) return;
      localStorage.setItem("token_doctor", name);
      set({ doctor: getDoctor() });
    },
    logout: () => {
      localStorage.removeItem("token_doctor");
      set({ doctor: getDoctor() });
    },
    isLoggedIn: () => !!getDoctor(),
  };
});

export default useDoctorProfile;
