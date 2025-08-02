const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  origin: {
    type: String,
    default: "",
  },
  education: {
    type: String,
    default: "",
  },
  about: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
     select: false
  },
});
module.exports =mongoose.model("Admin", adminSchema);