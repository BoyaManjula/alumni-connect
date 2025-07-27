const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

function extractKeywords(text) {
  const commonSkills = ['JavaScript', 'React', 'Node', 'MongoDB', 'Python', 'SQL', 'AWS'];
  return commonSkills.filter(skill => text.includes(skill));
}

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a job
router.post('/', async (req, res) => {
  try {
    const tags = extractKeywords(req.body.description);
    const job = new Job({ ...req.body, tags });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a job
router.put('/:id', async (req, res) => {
  try {
    const tags = extractKeywords(req.body.description);
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { ...req.body, tags },
      { new: true }
    );
    res.json(updatedJob);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a job
router.delete('/:id', async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

