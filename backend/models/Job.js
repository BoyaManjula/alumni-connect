const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  link: String,
  description: String,
  tags: [String],
  postedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);

