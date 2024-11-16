import express from "express";
import {
  sendVerificationCode,
  userLogin,
  userLogout,
  userSignup,
  verifyUser,
} from "../../../Controller/User/Auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", userSignup);
authRouter.post("/login", userLogin);
authRouter.post("/logout", userLogout);

authRouter.post("/verification-code", sendVerificationCode);
authRouter.post("/verify", verifyUser);

export default authRouter;
