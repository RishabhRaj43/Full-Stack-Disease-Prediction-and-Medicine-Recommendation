import { Navigate, Outlet } from "react-router-dom";

const DoctorAuthRoute = () => {
  if (localStorage.getItem("token_doctor")) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default DoctorAuthRoute;
