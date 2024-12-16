import jwt from "jsonwebtoken";

const jsonSetToken = (userid, res) => {
  const token = jwt.sign({ userid }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("token_user", token, {
    maxAge: 1000 * 60 * 60 * 24 * 15,
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
    secure: process.env.NODE_ENV === "production",
    domain: process.env.NODE_ENV === "production" ? ".yourdomain.com" : ".localhost",
  });

  return token;
};

export default jsonSetToken;
