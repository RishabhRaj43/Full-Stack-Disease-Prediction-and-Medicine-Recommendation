import jwt from "jsonwebtoken";
import User from "../../Model/User/User.model.js";

const userProtectRoute = async (req, res, next) => {
  try {
    if (!req.cookies.token_user) {
      return res.status(400).json({message:"No token found"});
    }

    const decoded = jwt.verify(
      req.cookies.token_user,
      process.env.JWT_SECRET
    );
    const user = await User.findById(decoded.userid);
    if (!user) {
      return res.status(400).json({message:"User not found"});
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export default userProtectRoute;