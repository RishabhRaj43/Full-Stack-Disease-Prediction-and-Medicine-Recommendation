import Doctor from "../../../Model/Doctor/Doctor.model.js";

export const getMostlikedDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).sort({ likes: -1 }).limit(5);
    return res.status(200).json(doctors);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const likeDoctor = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    if (doctor.likedBy.includes(req.user._id)) {
      return res.status(400).json({ message: "Doctor already liked" });
    }
    doctor.likedBy.push(req.user._id);
    req.user.favoriteDoctors.push(doctor._id);
    await Promise.all([await doctor.save(), await req.user.save()]);
    return res.status(200).json({
      message: "Doctor liked successfully",
      likes: doctor.likedBy,
      userId: req.user._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const unlikeDoctor = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    if (!doctor.likedBy.includes(req.user._id)) {
      return res.status(400).json({ message: "Doctor not liked" });
    }
    doctor.likedBy.pull(req.user._id);
    req.user.favoriteDoctors.pull(doctor._id);
    await Promise.all([await doctor.save(), await req.user.save()]);
    return res.status(200).json({
      message: "Doctor unliked successfully",
      likes: doctor.likedBy,
      userId: req.user._id,
    });
  } catch (error) {
    console.log("Error in unlikeDoctor: ", error);
    return res.status(500).json({ message: "Error in unliking doctor" });
  }
};
