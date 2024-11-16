import Doctor from "../../Model/Doctor/Doctor.model.js";
import bcrypt from "bcryptjs";
import jsonSetDoctorToken from "../../utils/Doctor/jsonWebTokenDoctor.js";
import sendEmail from "../../utils/User/SendMail.js";

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const tempDoctors = {};

export const doctorSignup = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      gender,
      phoneNumber,
      specialization,
      experience,
      fees,
    } = req.body;
    if (
      !username ||
      !email ||
      !password ||
      !gender ||
      !phoneNumber ||
      !specialization ||
      !experience ||
      !fees
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await Doctor.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    if (tempDoctors[email]) {
      return res
        .status(400)
        .json({ message: "Doctor already exists, Pls verify your email" });
    }

    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(5));

    let verificationCode = generateVerificationCode();
    await sendEmail(email, "Verification Code", verificationCode);

    verificationCode = await bcrypt.hash(
      verificationCode,
      await bcrypt.genSalt(5)
    );

    tempDoctors[email] = {
      username,
      email,
      password: hashedPassword,
      gender,
      verificationCode,
      phoneNumber,
      specialization,
      experience,
      fees,
      verificationExpiry: new Date(Date.now() + 60 * 60 * 1000),
    };

    return res.status(200).json({ message: "Pls verify your email now" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const verifyDoctor = async (req, res) => {
  let { email, verificationCode } = req.body;

  try {
    const tempDoctor = tempDoctors[email];

    if (!tempDoctor) {
      return res
        .status(400)
        .json({ message: "User not found or already verified" });
    }

    const isMatch = await bcrypt.compare(
      verificationCode,
      tempDoctor.verificationCode
    );

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong verification code" });
    }

    if (new Date() > tempDoctor.verificationExpiry) {
      delete tempDoctors[email];
      return res.status(400).json({ message: "Verification code expired" });
    }

    const newDoctor = new Doctor({
      username: tempDoctor.username,
      email: tempDoctor.email,
      password: tempDoctor.password,
      gender: tempDoctor.gender,
      isVerified: true,
      isTokenVerified: true,
      available: true,
      phoneNumber: tempDoctor.phoneNumber,
      specialization: tempDoctor.specialization,
      experience: tempDoctor.experience,
      fees: tempDoctor.fees,
    });
    await newDoctor.save();

    const token = jsonSetDoctorToken(newDoctor._id, res);
    console.log("token", token);

    delete tempDoctors[email];

    return res.status(200).json({ token, message: "User Verified" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const sendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!tempDoctors[email]) {
      return res.status(400).json({ message: "Doctor does not exist" });
    }

    const verificationCode = generateVerificationCode();

    await sendEmail(email, verificationCode);

    tempDoctors[email].verificationCode = await bcrypt.hash(
      verificationCode,
      await bcrypt.genSalt(5)
    );
    return res.status(200).json({ message: "Pls verify your email now" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("All fields are required");
    }

    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(404).json("Doctor not found");
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (!isMatch) {
      return res.status(400).json("Wrong password");
    }

    if (req.cookies.token_doctor) {
      return res.status(400).json("Already logged in");
    }

    const token = jsonSetDoctorToken(doctor._id, res);

    doctor.available = true;
    await doctor.save();

    return res.status(200).json({ token, message: "Doctor Logged in" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const doctorLogout = async (req, res) => {
  try {
    if (!req.cookies.token_doctor) {
      return res.status(400).json("No token found");
    }
    req.doctor.available = false;
    await req.doctor.save();
    res.clearCookie("token_doctor");
    return res.status(200).json({ message: "Doctor Logged out" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
