import express from "express";
import {
  getMostlikedDoctors,
  likeDoctor,
  unlikeDoctor,
  getAllDoctors
} from "../../../Controller/User/DoctorManagement/DoctorInfo.controller.js";

const doctorInfoRoute = express.Router();

doctorInfoRoute.get("/get-most-liked-doctors", getMostlikedDoctors);
doctorInfoRoute.post("/get-all-doctors", getAllDoctors);

doctorInfoRoute.post("/like-doctor", likeDoctor);
doctorInfoRoute.post("/unlike-doctor", unlikeDoctor);

export default doctorInfoRoute;
