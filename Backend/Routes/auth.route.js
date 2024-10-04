import express from "express";
import { userLogin, userLogout, userSignup } from "../Controller/Auth.controller.js";

const router = express.Router();

router.post("/signup",userSignup);
router.post("/login",userLogin);
router.get("/logout",userLogout);

export default router;