import express from "express";
import {
  sendVerificationCode,
  userLogin,
  userLogout,
  userSignup,
  getCurrentUser,
  verifyUser,
  userUpdate,
  getCookie,
} from "../../../Controller/User/Auth.controller.js";
import UserProtectRoute from "../../../MiddleWare/User/UserProtectRoute.js";
import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    const fileName = `${req.user._id}_profilePhoto${extension}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

const authRouter = express.Router();

authRouter.post("/signup", userSignup);
authRouter.post("/login", userLogin);
authRouter.get("/logout", userLogout);
authRouter.get("/current", UserProtectRoute, getCurrentUser);
authRouter.post(
  "/update",
  UserProtectRoute,
  upload.single("profilePhoto"),
  userUpdate
);
authRouter.get("/cookie", UserProtectRoute, getCookie);

authRouter.post("/verification-code", sendVerificationCode);
authRouter.post("/verify", verifyUser);

export default authRouter;
