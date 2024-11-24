import jwt from "jsonwebtoken";

const jsonSetToken = (userid, res) => {
  const token = jwt.sign({ userid }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("token_user", token, {
    maxAge: 1000 * 60 * 60 * 24 * 15, // 15 day
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return token;
};

export default jsonSetToken;
