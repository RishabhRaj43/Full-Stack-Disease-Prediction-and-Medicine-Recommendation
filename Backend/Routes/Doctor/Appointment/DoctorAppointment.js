import express from "express";
import {
  cancelAppointment,
  getAllAppointments,
} from "../../../Controller/Doctor/DoctorManage/DoctorAppointment.controller.js";

const doctorAppointmentRoute = express.Router();

doctorAppointmentRoute.get("/get-all-appointments", getAllAppointments);

export default doctorAppointmentRoute;

