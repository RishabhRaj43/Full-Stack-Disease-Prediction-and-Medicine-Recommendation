import { Navigate, Outlet } from "react-router-dom";

const DoctorAuthRoute = () => {
  if (localStorage.getItem("token_doctor")) {
    return <Navigate to="/doctor" />;
  }
  return <Outlet />;
};

export default DoctorAuthRoute;
