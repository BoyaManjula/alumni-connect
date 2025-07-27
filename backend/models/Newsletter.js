// backend/models/Newsletter.js
const mongoose = require("mongoose");

const newsletterSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Newsletter", newsletterSchema);

