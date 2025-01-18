const express = require("express");
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRE, ADMIN_USERNAME, ADMIN_PASSWORD } = require('../config/config');
const Submission = require("../models/submission.model");
const BlacklistedToken = require('../models/blacklistedToken.model');
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

// Admin login route
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        const token = jwt.sign(
            { username, role: 'admin' },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRE }
        );
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Admin logout route
router.post('/logout', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      await BlacklistedToken.create({ token });
    }
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error logging out' });
  }
});

// Admin fetch all submissions with authentication
router.get("/submissions", adminAuth, async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.status(200).json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ error: "Error fetching submissions." });
  }
});

module.exports = router;