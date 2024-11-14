import express from "express";
import {
  sendVerificationCode,
  userLogin,
  userLogout,
  userSignup,
  verifyUser,
} from "../Controller/Auth.controller.js";

const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/logout", userLogout);

router.post("/verification-code", sendVerificationCode);
router.post("/verify", verifyUser);

export default router;
