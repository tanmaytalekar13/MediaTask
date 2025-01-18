const express = require("express");
const Submission = require("../models/submission.model");  // Correct path to model
const router = express.Router();
const { upload, uploadToSupabase } = require("../config/multer");

router.post("/submit", upload.array("images"), async (req, res) => {
  try {
    const { name, socialMedia } = req.body;

    if (!name || !socialMedia) {
      return res.status(400).json({ error: "Name and social media handle are required" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    // Upload all images to Supabase and get their URLs
    const imageUrls = await Promise.all(
      req.files.map(file => uploadToSupabase(file))
    );

    // Create submission with image URLs
    const submission = new Submission({ 
      name, 
      socialMedia, 
      images: imageUrls 
    });
    await submission.save();

    res.status(201).json({ 
      message: "Submission successful!",
      submission,
    });
  } catch (error) {
    console.error("Error in submission:", error);
    if (error.message.includes('Invalid file type')) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message || "Error saving submission." });
  }
});

module.exports = router;
