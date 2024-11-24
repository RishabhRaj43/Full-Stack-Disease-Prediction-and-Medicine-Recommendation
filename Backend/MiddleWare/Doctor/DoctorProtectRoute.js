import Doctor from "../../Model/Doctor/Doctor.model.js";
import jwt from "jsonwebtoken";

const doctorProtectRoute = async (req, res, next) => {
  try {
    
    if (!req.cookies.token_doctor) {
      return res.status(400).json({message:"No token found"});
    }
    
    const decoded = jwt.verify(
      req.cookies.token_doctor,
      process.env.JWT_SECRET_DOCTOR
    );
    const doctor = await Doctor.findById(decoded.doctorid);
    if (!doctor) {
      return res.status(400).json({message:"Doctor not found"});
    }

    req.doctor = doctor;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export default doctorProtectRoute;