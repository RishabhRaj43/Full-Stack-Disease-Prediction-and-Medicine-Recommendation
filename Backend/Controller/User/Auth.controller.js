import User from "../../Model/User/User.model.js";
import bcrypt from "bcryptjs";
import jsonSetToken from "../../utils/User/jsonWebToken.User.js";
import sendEmail from "../../utils/User/SendMail.js";

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const tempUsers = {};

export const getCurrentUser = async (req, res) => {
  try {
    return res.status(200).json({ user: req.user });
  } catch (error) {
    console.log("Error in getCurrentUser: ", error);
    return res.status(500).json({ message: "Error fetching user data" });
  }
};

export const userSignup = async (req, res) => {
  try {
    const { username, email, password, gender, phoneNumber } = req.body;
    if (!username || !email || !password || !gender || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (tempUsers[email]) {
      return res
        .status(400)
        .json({ message: "User already exists, Pls verify your email" });
    }

    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(5));

    let verificationCode = generateVerificationCode();
    await sendEmail(email, "Verification Code", verificationCode);

    verificationCode = await bcrypt.hash(
      verificationCode,
      await bcrypt.genSalt(5)
    );

    tempUsers[email] = {
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      gender,
      verificationCode,
      verificationExpiry: new Date(Date.now() + 60 * 60 * 60 * 1000),
    };

    return res.status(200).json({ message: "Pls verify your email now" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const verifyUser = async (req, res) => {
  let { email, verificationCode } = req.body;

  try {
    const tempUser = tempUsers[email];
    console.log(tempUser);

    if (!tempUser) {
      return res
        .status(400)
        .json({ message: "User not found or already verified" });
    }

    const isMatch = await bcrypt.compare(
      verificationCode,
      tempUser.verificationCode
    );

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong verification code" });
    }

    if (new Date() > tempUser.verificationExpiry) {
      delete tempUsers[email];
      return res.status(400).json({ message: "Verification code expired" });
    }

    const newUser = new User({
      username: tempUser.username,
      email: tempUser.email,
      password: tempUser.password,
      phoneNumber: tempUser.phoneNumber,
      gender: tempUser.gender,
      isVerified: true,
      isTokenVerified: true,
    });
    await newUser.save();

    const token = jsonSetToken(newUser._id, res);
    console.log("token", token);

    delete tempUsers[email];

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

    if (!tempUsers[email]) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const verificationCode = generateVerificationCode();

    await sendEmail(email, "Verification Code", verificationCode);

    tempUsers[email].verificationCode = await bcrypt.hash(
      verificationCode,
      await bcrypt.genSalt(5)
    );
    return res.status(200).json({ message: "Pls verify your email now" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    if (req.cookies.token_user) {
      return res.status(400).json({ message: "Already logged in" });
    }

    const token = jsonSetToken(user._id, res);
    console.log("token", token);

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

      return res.status(400).json({ message: "No token found" });
    }
    res.clearCookie("token_user");
    return res.status(200).json({ message: "User Logged out" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const userUpdate = async (req, res) => {
  try {
    const { username, email, password, gender, phoneNumber } = req.body;
    await User.findByIdAndUpdate(req.user._id, {
      username,
      email,
      password,
      gender,
      phoneNumber,
    });

    return res.status(200).json({ message: "User Updated" });
  } catch (error) {
    console.log("Error in userUpdate: " + error);
    return res.status(500).json(error);
  }
};
