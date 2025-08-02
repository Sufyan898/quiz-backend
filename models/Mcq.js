const mongoose = require('mongoose');
const mcqSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
        enum: ['MongoDB', 'Express', 'React', 'Node'],
    },
    options: {
    type: [String], // array of 4 options
    validate: [arrayLimit, '{PATH} must have exactly 4 options'],
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },  
});
function arrayLimit(val) {
  return val.length === 4;
}

module.exports = mongoose.model('Mcq', mcqSchema);