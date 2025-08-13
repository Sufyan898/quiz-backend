import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import studentRoutes from "./routes/studentRoute.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/student", studentRoutes);

// DB Connect & Server Start
mongoose.connect("mongodb://127.0.0.1:27017/quizapp")
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.error(err));
