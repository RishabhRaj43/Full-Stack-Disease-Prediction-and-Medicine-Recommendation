import Appointment from "../../../Model/Appointment.model.js";
import Doctor from "../../../Model/Doctor/Doctor.model.js";

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patientId: req.user._id,
    }).populate("doctorId");
    res.status(200).json({ appointments, userId: req.user._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const createAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, status } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(400).json({ message: "Doctor not found" });
    }

    const [hour, minute] = time.split(":");
    const providedDateTime = new Date(date);
    providedDateTime.setHours(hour, minute, 0, 0);

    const conflictingAppointment = await Appointment.findOne({
      doctorId,
      status: { $ne: "cancelled" },
      $or: [
        { start: { $lte: providedDateTime }, end: { $gte: providedDateTime } },
        {
          start: {
            $lte: new Date(providedDateTime.getTime() + 2 * 60 * 60 * 1000),
          },
          end: {
            $gte: new Date(providedDateTime.getTime() + 2 * 60 * 60 * 1000),
          },
        },
      ],
    });

    if (conflictingAppointment) {
      return res.status(400).json({
        message: "Sorry this time slot is already taken",
      });
    }

    const endDateTime = new Date(providedDateTime);
    endDateTime.setHours(endDateTime.getHours() + 2);

    const newAppointment = new Appointment({
      doctorId,
      patientId: req.user._id,
      start: providedDateTime,
      end: endDateTime,
      status,
    });

    req.user.appointments.push(newAppointment._id);
    doctor.appointments.push(newAppointment._id);

    await req.user.save();
    await doctor.save();
    await newAppointment.save();

    res.status(200).json({
      message: "Booking created successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    console.log("Error in Appointment Controller: " + error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(400).json({ message: "Appointment not found" });
    }

    const doctor = await Doctor.findById(appointment.doctorId);
    if (!doctor) {
      return res.status(400).json({ message: "Doctor or User not found" });
    }

    if (appointment.status === "cancelled") {
      return res.status(400).json({ message: "Appointment already canceled" });
    }

    appointment.status = "cancelled";
    await appointment.save();

    doctor.appointments.pull(appointmentId);
    req.user.appointments.pull(appointmentId);

    await doctor.save();
    await req.user.save();

    return res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.log("Error in cancelAppointment: ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
