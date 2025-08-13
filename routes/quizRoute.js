import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/start", authMiddleware, (req, res) => {
  res.json({ message: "Quiz started! You are authorized." });
});

export default router;
