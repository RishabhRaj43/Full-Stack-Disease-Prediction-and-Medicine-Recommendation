import express from "express";
import {
  getDoctorPosts,
  getFavPosts,
  likeDoctorPost,
  unlikeDoctorPost,
} from "../../../Controller/User/DoctorManagement/DoctorPost.controller.js";

const doctorPostRoute = express.Router();

doctorPostRoute.get("/", getDoctorPosts);
doctorPostRoute.post("/like-post", likeDoctorPost);
doctorPostRoute.post("/unlike-post", unlikeDoctorPost);

doctorPostRoute.get("/get-fav-posts", getFavPosts);

export default doctorPostRoute;
