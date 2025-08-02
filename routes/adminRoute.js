const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware'); 

const { registerAdmin, loginAdmin, updateAdminProfile, getAdminProfile } = require("../controllers/adminController");

router.get("/dashboard", verifyToken, (req, res) => {
    res.json({
        message: `Welcome Admin`,
        adminID: req.admin.id,
    });
});

router.get("/profile", verifyToken, getAdminProfile);
router.put("/update-profile", verifyToken, updateAdminProfile);

// Auth routes  
router.post("/register", registerAdmin);
router.post("/login", loginAdmin); 

router.get("/logout", (req, res) => {
    res.status(200).json({ message: "Logout successful" });
});

module.exports = router;
