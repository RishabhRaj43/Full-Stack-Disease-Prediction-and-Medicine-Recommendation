import express from "express";
import {
  doctorLogin,
  doctorLogout,
  doctorSignup,
  getDoctor,
  updateDoctor,
  verifyDoctor,
} from "../../../Controller/Doctor/DoctorAuth.controller.js";
import doctorProtectRoute from "../../../MiddleWare/Doctor/DoctorProtectRoute.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    const fileName = `${req.doctor._id}_profilePhoto${extension}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

const doctorAuthRoute = express.Router();

doctorAuthRoute.post("/signup", doctorSignup);
doctorAuthRoute.post("/login", doctorLogin);
doctorAuthRoute.get("/logout", doctorProtectRoute, doctorLogout);

doctorAuthRoute.put(
  "/update",
  doctorProtectRoute,
  upload.single("profilePhoto"),
  updateDoctor
);

doctorAuthRoute.get("/info", doctorProtectRoute, getDoctor);

// doctorAuthRoute.post("/verification-code", (req, res) => {});

doctorAuthRoute.post("/verify", verifyDoctor);

export default doctorAuthRoute;
