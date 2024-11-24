import Appointment from "../../../Model/Appointment.model.js";
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctorId: req.doctor._id,
    }).sort({ createdAt: -1 });
    return res.status(200).json({ appointments, doctor: req.doctor });
  } catch (error) {
    console.log("Error in getAllAppointments: ", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const cancelAppointment = async (req, res) => {}
