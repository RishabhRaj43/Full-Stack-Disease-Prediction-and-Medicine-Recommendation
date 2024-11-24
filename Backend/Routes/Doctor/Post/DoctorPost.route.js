import express from "express";
import {
  createDoctorPost,
  deleteDoctorPost,
  getPost,
} from "../../../Controller/Doctor/DoctorManage/DoctorPost.controller.js";

const doctorPostRoute = express.Router();

doctorPostRoute.post("/create-post", createDoctorPost);
doctorPostRoute.post("/delete-post", deleteDoctorPost);

doctorPostRoute.get("/", getPost);

export default doctorPostRoute;
