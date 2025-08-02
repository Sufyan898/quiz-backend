const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// POST /api/studentform
router.post("/", async (req, res) => {
  const { name, cnic, fatherName, dob, selectedSubject } = req.body;

  try {
    // Check if CNIC already exists
    const existing = await Student.findOne({ cnic });
    if (existing) {
      return res.status(400).json({ message: "This CNIC has already been used." });
    }

    const newStudent = new Student({
      name,
      cnic,
      fatherName,
      dob,
      selectedSubject
    });

    await newStudent.save();
    res.status(201).json({ message: "Form submitted successfully!" });

  } catch (error) {
    console.error("Error saving student:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
