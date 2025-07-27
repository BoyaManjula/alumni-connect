// models/SentMail.js
const mongoose = require("mongoose");

const sentMailSchema = new mongoose.Schema({
  to: String,
  subject: String,
  text: String,
  html: String,
  fileName: String,
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SentMail", sentMailSchema);

