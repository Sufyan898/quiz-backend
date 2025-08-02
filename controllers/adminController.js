const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ Register Admin
const registerAdmin = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // 1️⃣ Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ success: false, message: "Admin already exists" });
    }

    // 2️⃣ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3️⃣ Create new admin
    const newAdmin = new Admin({
      fullName,
      email,
      password: hashedPassword,
    });

    // 4️⃣ Save to DB
    await newAdmin.save();

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Login Admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1️⃣ Check if admin exists
const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
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

// ✅ Update Admin Profile (new function)
const updateAdminProfile = async (req, res) => {
  try {
    const adminId = req.admin.id; // req.admin is coming from the verifyToken middleware

    const { fullName, origin, education, about } = req.body;

    // ✅ Update fields
    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { fullName, origin, education, about },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      admin: {
        fullName: updatedAdmin.fullName,
        origin: updatedAdmin.origin,
        education: updatedAdmin.education,
        about: updatedAdmin.about,
        email: updatedAdmin.email,
      },
    });
  } catch (error) {
    console.error("Profile update error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }
    res.status(200).json({ success: true, admin });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



// ✅ Export all controllers
module.exports = {
  registerAdmin,
  loginAdmin,
  updateAdminProfile, // 👈 must be exported for route to use
  getAdminProfile,
};
