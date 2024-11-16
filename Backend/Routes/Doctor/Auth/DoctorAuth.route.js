import express from "express";
import {
  doctorLogin,
  doctorLogout,
  doctorSignup,
  verifyDoctor,
} from "../../../Controller/Doctor/DoctorAuth.controller.js";
import doctorProtectRoute from "../../../MiddleWare/Doctor/DoctorProtectRoute.js";

const doctorAuthRoute = express.Router();

doctorAuthRoute.post("/signup", doctorSignup);
doctorAuthRoute.post("/login", doctorLogin);
doctorAuthRoute.post("/logout", doctorProtectRoute, doctorLogout);

// doctorAuthRoute.post("/verification-code", (req, res) => {});

doctorAuthRoute.post("/verify", verifyDoctor);

export default doctorAuthRoute;
