import express from "express";
import authRouter from "./Auth/auth.route.js";
import userProtectRoute from "../../MiddleWare/User/UserProtectRoute.js";
import appointmentRoute from "./DoctorManagement/Appointment.route.js";
import doctorPostRoute from "./DoctorManagement/DoctorPost.route.js";
import doctorInfoRoute from "./DoctorManagement/DoctorInfo.route.js";

const userRouter = express.Router();

userRouter.use("/auth", authRouter);
userRouter.use("/appointment", userProtectRoute, appointmentRoute);

userRouter.use("/doctor-info", userProtectRoute, doctorInfoRoute);

userRouter.use("/doctor-post", userProtectRoute, doctorPostRoute);

export default userRouter;
