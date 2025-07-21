// routes/studentRoute.js
const express = require("express");
const router = express.Router();
const { registerStudent } = require("../controllers/studentController");

// POST /api/student
router.post("/", registerStudent);

module.exports = router;
