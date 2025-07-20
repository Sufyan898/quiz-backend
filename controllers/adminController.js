const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerAdmin = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    //1 Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if(existingAdmin) {
      return res.status(400).json({ success: false, message: "Admin alredy exist" });
    }
    //2 Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //3 Create new admin 
    const newAdmin = new Admin({
      fullName,
      email,
      password: hashedPassword,
    });

    //4 Save to db
    await newAdmin.save();
    res.status(201).json({
      success: true,
      message: "Admin registerd successfully",
    });
  } catch (error) {
console.error("Login error:", error); // change this line
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1️⃣ Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // 3️⃣ Generate token
    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "30d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        _id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
      },
    });

  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { registerAdmin, loginAdmin };
