import Doctor from "../../../Model/Doctor/Doctor.model.js";
import Specialization from "../../../Model/Doctor/Specialization.model.js";

export const getMostlikedDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).sort({ likes: -1 }).limit(5);
    return res.status(200).json(doctors);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const { speciality } = req.body;
    const limit = req.query.limit || 5;
    if (!speciality) {
      const doctors = await Doctor.find({}).limit(limit);
      return res.status(200).json({
        doctors,
        userId: req.user._id,
        message: "There are no Doctors with this speciality",
      });
    }
    const specialization = await Specialization.findOne({
      name: speciality.toLowerCase(),
    })
      .populate("doctors")
      .limit(limit);

    if (!specialization) {
      return res.status(404).json({
        message: "There are no Doctors with this speciality",
        userId: req.user._id,
      });
    }

    return res.status(200).json({
      doctors: specialization.doctors,
      userId: req.user._id,
      totalDoctorLength: await Doctor.countDocuments(),
    });
  } catch (error) {
    console.log("Error in getAllDoctors: ", error);
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

export const getDoctorInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id).select(
      "-password -isTokenVerified -appointments"
    );
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    return res.status(200).json({ doctor, userId: req.user._id });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const limit = req.query.limit || 5;
    const categories = await Specialization.find({})
      .select("name")
      .limit(limit);
    return res.status(200).json({
      categories,
      userId: req.user._id,
      length: await Specialization.countDocuments(),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
