const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  title: String,
  date: Date,
  time: String,
  location: String,
  description: String,
});

module.exports = mongoose.model('Meeting', meetingSchema);

