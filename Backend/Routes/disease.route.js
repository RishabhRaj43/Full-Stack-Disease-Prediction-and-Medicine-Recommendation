import express from "express";
import mongoose from "mongoose";

const disease = express.Router();

disease.get("/", async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const diseaseCollection = db.collection("Diseases");

    const diseases = await diseaseCollection.find({}).toArray();

    return res.status(200).json(diseases);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
});

export default disease;
