// backend/routes/auth.js
const express = require("express");
const router = express.Router();

// Use the Alumni model for login
const Alumni = require("../models/Alumni");

// Login route (check against Alumni collection)
router.post("/login", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and Email are required." });
  }

  try {
    const alumni = await Alumni.findOne({ name, email });

    if (!alumni) {
      return res.status(404).json({ error: "Invalid Name or Email" });
    }

    res.status(200).json({
      message: "✅ Login successful!",
      alumni: {
        id: alumni._id,
        name: alumni.name,
        email: alumni.email,
      },
    });
  } catch (error) {
    console.error("Server error during login:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

