import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const aiRouter = express.Router();

aiRouter.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const geminiModel = genAI.getGenerativeModel({
      model: "gemini-pro",
    });

    // const prompt = "";
    const result = await geminiModel.generateContent(message);
    const response = result.response;

    return res.status(200).json({ message: response.text() });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
});

export default aiRouter;
