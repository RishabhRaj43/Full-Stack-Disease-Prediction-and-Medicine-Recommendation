import jwt from "jsonwebtoken";

const jsonSetDoctorToken = (userid, res) => {
  const token = jwt.sign({ userid }, process.env.JWT_SECRET_DOCTOR, {
    expiresIn: "15d",
  });

  res.cookie("token_doctor", token, {
    maxAge: 1000 * 60 * 60 * 24 * 15, // 15 day
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return token;
};

export default jsonSetDoctorToken;
