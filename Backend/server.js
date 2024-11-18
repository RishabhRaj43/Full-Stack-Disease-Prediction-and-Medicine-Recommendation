import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import userRouter from "./Routes/User/UserRoute.js";
import connectDB from "./MongoDB/Connect.js";
import aiRouter from "./Routes/User/ai.route.js";

import doctorMainRoute from "./Routes/Doctor/DoctorMain.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const port = process.env.PORT || 3000;


app.use("/api/user", userRouter);
app.use("/ai", aiRouter);
app.use("/api/doctor", doctorMainRoute);

app.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port}`);
});
