import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  selectedSubject: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);
