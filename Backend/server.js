import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import router from "./Routes/auth.route.js";
import connectDB from "./MongoDB/Connect.js";
import disease from "./Routes/disease.route.js";
import aiRouter from "./Routes/ai.route.js";

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

app.use("/api",router)
app.use("/disease",disease)
app.use("/ai",aiRouter);

app.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port}`);
});
