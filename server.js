const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Import routes (once only)
const adminRoute = require("./routes/adminRoute");
const studentRoute = require("./routes/studentRoute");

// Create express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Route middleware
app.use("/api/admin", adminRoute);
app.use("/api/student", studentRoute);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected ✅"))
.catch((err) => console.log("MongoDB error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
