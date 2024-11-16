import express from "express";
import {
  createDoctorPost,
  deleteDoctorPost,
} from "../../../Controller/Doctor/DoctorManage/DoctorPost.controller.js";

const doctorPostRoute = express.Router();

doctorPostRoute.post("/create-post", createDoctorPost);
doctorPostRoute.post("/delete-post", deleteDoctorPost);

export default doctorPostRoute;
