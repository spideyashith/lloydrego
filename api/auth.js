const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Simple login for admin (hardcoded for demo)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Hardcoded admin credentials for demo
  if (username === 'admin' && password === 'lloyd2025') {
    const token = jwt.sign({ userId: 1, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
