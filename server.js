const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for JSON parsing

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected ✅"))
.catch((err) => console.log("MongoDB error:", err));

// Routes
app.use("/api/admin", adminRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
