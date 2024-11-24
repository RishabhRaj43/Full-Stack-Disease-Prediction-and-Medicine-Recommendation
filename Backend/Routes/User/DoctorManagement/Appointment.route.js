import express from "express";
import {
  cancelAppointment,
  createAppointment,
  getAllAppointments,
} from "../../../Controller/User/DoctorManagement/Appointment.controller.js";

const appointmentRoute = express.Router();

appointmentRoute.post("/get-all-appointments", getAllAppointments);
appointmentRoute.post("/create-appointment", createAppointment);
appointmentRoute.post("/cancel-appointment", cancelAppointment);

export default appointmentRoute;
