const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  cnic: {
    type: String,
    required: true,
    unique: true, // this line prevents duplicate CNICs
  },
  fatherName: String,
  dob: String,
  selectedSubject: String,
  submittedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Student", studentSchema);
