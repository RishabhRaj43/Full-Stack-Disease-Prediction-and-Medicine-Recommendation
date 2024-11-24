import express from "express";
import doctorAuthRoute from "./Auth/DoctorAuth.route.js";
import doctorProtectRoute from "../../MiddleWare/Doctor/DoctorProtectRoute.js";
import doctorPostRoute from "./Post/DoctorPost.route.js";
import doctorAppointmentRoute from "./Appointment/DoctorAppointment.js";

const doctorMainRoute = express.Router();

doctorMainRoute.use("/auth", doctorAuthRoute);

doctorMainRoute.use("/doctor-post", doctorProtectRoute, doctorPostRoute);

doctorMainRoute.use("/doctor-appointment", doctorProtectRoute,doctorAppointmentRoute);

export default doctorMainRoute;
