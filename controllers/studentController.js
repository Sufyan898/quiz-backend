import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Helper: Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h"
  });
};

// =========================
// Signup Controller
// =========================
export const signupStudent = async (req, res) => {
  try {
    const { name, email, password, dob, subject } = req.body;

    // 1. Validation
    if (!name || !email || !password || !dob || !subject) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check existing user
    const existing = await Student.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create student
    const newStudent = await Student.create({
      name,
      email,
      password: hashedPassword,
      dob,
      selectedSubject: subject
    });

    // 5. Generate token
    const token = generateToken(newStudent._id);

    // 6. Response
    res.status(201).json({
      message: "Signup successful",
      token,
      student: {
        id: newStudent._id,
        name: newStudent.name,
        selectedSubject: newStudent.selectedSubject
      }
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// =========================
// Login Controller
// =========================
export const loginStudent = async (req, res) => {
  try {
    const { email, password, subject } = req.body;

    // 1. Find student by email
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 3. Generate token
    const token = generateToken(student._id);

    // 4. Response
    res.json({
      message: "Login successful",
      token,
      student: {
        id: student._id,
        name: student.name,
        selectedSubject: student.selectedSubject
      }
    });
  } catch (err) {
  console.error("Signup Error:", err);
  return res.status(500).json({ message: err.message || "Server error" });
}

};
