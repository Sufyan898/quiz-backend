// controllers/studentController.js
const User = require("../models/Student");

// POST /api/student
const registerStudent = async (req, res) => {
  try {
    const { name, cnic, fName, dob, lastMarks } = req.body;

    const existingUser = await User.findOne({ cnic });
    if (existingUser) {
      return res.status(409).json({ error: "User with this CNIC already exists" });
    }

    const newUser = new User({ name, cnic, fName, dob, lastMarks });
    await newUser.save();

    res.status(201).json({ message: "User saved successfully!" });
  } catch (err) {
    console.error("Error saving user:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  registerStudent,
};
