const express = require('express');
const router = express.Router();
const Mcq = require('../models/Mcq');

router.post('/', async (req, res) => {
  try {
    const { mcqs } = req.body;

    if (!Array.isArray(mcqs) || mcqs.length === 0) {
      return res.status(400).json({ message: 'MCQ list is required' });
    }

    const invalidMcq = mcqs.find(mcq => 
      !mcq.subject || !mcq.question || !mcq.options || mcq.options.length !== 4 || !mcq.correctAnswer
    );

    if (invalidMcq) {
      return res.status(400).json({ message: 'Each MCQ must have subject, question, 4 options, and correct answer' });
    }

    await Mcq.insertMany(mcqs);
    res.status(201).json({ message: 'MCQs added successfully' });

  } catch (error) {
    console.error('Error saving MCQs:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



module.exports = router;
