const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  cnic: {type: String, unique: true},
  fName: String,
  dob: String,
  lastMarks: Number,
  
});

module.exports = mongoose.model("Student", studentSchema);
