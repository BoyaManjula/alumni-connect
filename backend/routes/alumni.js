const express = require("express");
const router = express.Router();
const Alumni = require("../models/Alumni");

// GET all alumni
router.get("/", async (req, res) => {
  try {
    const alumni = await Alumni.find();
    res.json(alumni);
  } catch (error) {
    console.error("Error fetching alumni:", error);
    res.status(500).json({ error: "Error fetching alumni" });
  }
});

// POST a new alumni
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const newAlumni = new Alumni(req.body);
    const savedAlumni = await newAlumni.save();
    res.status(201).json(savedAlumni);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already exists." });
    }
    console.error("Error creating alumni record:", error);
    res.status(500).json({ error: "Error creating alumni record" });
  }
});

// PUT update alumni by id
router.put("/:id", async (req, res) => {
  try {
    const updatedAlumni = await Alumni.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,  // to run schema validations on update
    });
    if (!updatedAlumni) {
      return res.status(404).json({ error: "Alumni not found" });
    }
    res.json(updatedAlumni);
  } catch (error) {
    console.error("Error updating alumni:", error);
    res.status(500).json({ error: "Error updating alumni" });
  }
});

// DELETE alumni by id
router.delete("/:id", async (req, res) => {
  try {
    const deletedAlumni = await Alumni.findByIdAndDelete(req.params.id);
    if (!deletedAlumni) {
      return res.status(404).json({ error: "Alumni not found" });
    }
    res.json({ message: "Alumni deleted successfully", deletedAlumni });
  } catch (error) {
    console.error("Error deleting alumni:", error);
    res.status(500).json({ error: "Error deleting alumni" });
  }
});

module.exports = router;

