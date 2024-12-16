import Appointment from "../../../Model/Appointment.model.js";
import Doctor from "../../../Model/Doctor/Doctor.model.js";

export const getAllAppointments = async (req, res) => {
  try {
    const { status, date } = req.body;
    const limit = req.query.limit || 5;
    if (status) {
      const appointments = await Appointment.find({
        status,
        patientId: req.user._id,
      })
        .populate("doctorId")
        .sort({ createdAt: -1 })
        .limit(limit);
      return res.status(200).json({
        appointments,
        userId: req.user._id,
        totalAppointmentsLength: await Appointment.countDocuments({
          status,
          patientId: req.user._id,
        }),
      });
    }
    await Appointment.updateMany(
      {
        patientId: req.user._id,
        end: { $lt: new Date() },
      },
      { status: "completed" }
    );
    const appointments = await Appointment.find({
      patientId: req.user._id,
    })
      .populate("doctorId")
      .sort({ createdAt: -1 })
      .limit(limit);
    res.status(200).json({
      appointments,
      totalAppointmentsLength: await Appointment.countDocuments({
        patientId: req.user._id,
      }),
      userId: req.user._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const createAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;

    if (!doctorId || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const [hour, minute] = time.split(":").map(Number);
    if (isNaN(hour) || isNaN(minute)) {
      return res.status(400).json({ message: "Invalid time format" });
    }

    const providedDateTime = new Date(date);
    providedDateTime.setHours(hour, minute, 0, 0);

    const twoHoursLater = new Date(
      providedDateTime.getTime() + 2 * 60 * 60 * 1000
    );
    const conflictingAppointment = await Appointment.findOne({
      doctorId,
      status: { $ne: "cancelled" },
      $or: [
        { start: { $lte: providedDateTime }, end: { $gte: providedDateTime } },
        { start: { $lte: twoHoursLater }, end: { $gte: twoHoursLater } },
      ],
    });

    if (conflictingAppointment) {
      return res
        .status(400)
        .json({ message: "Sorry, this time slot is already taken" });
    }

    const endDateTime = new Date(providedDateTime);
    endDateTime.setHours(endDateTime.getHours() + 2);

    console.log(
      "Start Time: ",
      providedDateTime,
      " \nendDateTime: ",
      endDateTime
    );

    const newAppointment = new Appointment({
      doctorId,
      patientId: req.user._id,
      start: providedDateTime,
      end: endDateTime,
    });

    req.user.appointments.push(newAppointment._id);
    doctor.appointments.push(newAppointment._id);

    await Promise.all([req.user.save(), doctor.save(), newAppointment.save()]);

    res.status(200).json({
      message: "Booking created successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error("Error in createAppointment:", error);
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
