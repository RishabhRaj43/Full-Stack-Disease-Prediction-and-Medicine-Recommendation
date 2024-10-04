import User from "../Model/User.model.js";
import bcrypt from "bcryptjs";
import jsonSetToken from "../utils/jsonWebToken.User.js";

export const userSignup = async (req, res) => {
  try {
    const { username, email, password, gender } = req.body;
    if (!username || !email || !password || !gender) {
      return res.status(400).json("All fields are required");
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      gender,
    });
    await newUser.save();
    console.log(newUser._id);

    const token = jsonSetToken(newUser._id, res);

    return res.status(200).json({ token, message: "User Created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("All fields are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json("Wrong password");
    }

    if (req.cookies.token_user) {
      return res.status(400).json("Already logged in");
    }

    const token = jsonSetToken(user._id, res);

    return res.status(200).json({ token, message: "User Logged in" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const userLogout = async (req, res) => {
  try {
    console.log(req.cookies);
    
    if (!req.cookies.token_user) {
      // console.log("no token found");
      
      return res.status(400).json("No token found");
    }
    res.clearCookie("token_user");
    return res.status(200).json({ message: "User Logged out" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
