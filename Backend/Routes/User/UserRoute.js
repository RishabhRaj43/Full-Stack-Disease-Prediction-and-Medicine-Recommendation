import express from "express";
import authRouter from "./Auth/auth.route.js";
import userProtectRoute from "../../MiddleWare/User/UserProtectRoute.js";
import appointmentRoute from "./DoctorManagement/Appointment.route.js";

const userRouter = express.Router();

userRouter.use("/auth", authRouter);
userRouter.use("/appointment", userProtectRoute, appointmentRoute);

export default userRouter;
