import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

import userRouter from "./Routes/User/UserRoute.js";
import connectDB from "./MongoDB/Connect.js";
import aiRouter from "./Routes/User/ai.route.js";

import doctorMainRoute from "./Routes/Doctor/DoctorMain.route.js";

dotenv.config();

const app = express();

const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/user", userRouter);
app.use("/ai", aiRouter);
app.use("/api/doctor", doctorMainRoute);

server.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port}`);
});
