import express from "express";
import {
  sendVerificationCode,
  userLogin,
  userLogout,
  userSignup,
  getCurrentUser,
  verifyUser,
  userUpdate,
} from "../../../Controller/User/Auth.controller.js";
import UserProtectRoute from "../../../MiddleWare/User/UserProtectRoute.js";


const authRouter = express.Router();

authRouter.post("/signup", userSignup);
authRouter.post("/login", userLogin);
authRouter.get("/logout", userLogout);
authRouter.get("/current",UserProtectRoute, getCurrentUser);
authRouter.post("/update",UserProtectRoute, userUpdate);

authRouter.post("/verification-code", sendVerificationCode);
authRouter.post("/verify", verifyUser);

export default authRouter;
