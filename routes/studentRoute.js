import express from "express";
import { signupStudent, loginStudent } from "../controllers/studentController.js";

const router = express.Router();

router.post("/signup", signupStudent);
router.post("/login", loginStudent);  // <-- Add this

export default router;
