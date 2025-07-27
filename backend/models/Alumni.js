const mongoose = require("mongoose");

const alumniSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // To prevent duplicate emails
  },
  batch: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
});

const Alumni = mongoose.model("Alumni", alumniSchema);

module.exports = Alumni;

