const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware'); 

const { registerAdmin, loginAdmin } = require("../controllers/adminController");

router.get("/dashboard", verifyToken, (req, res) => {
    res.json({
        message: `Welcome Admin`,
        adminID: req.admin.id,
    });
});

// POST /api/admin/register
router.post("/register", registerAdmin);
router.post("/login", loginAdmin); 
module.exports = router;