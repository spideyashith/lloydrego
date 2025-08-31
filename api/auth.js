// api/routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Demo hardcoded admin; switch to DB lookup later
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'lloyd2025';

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign(
      { userId: 1, role: 'admin' },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: '24h' }
    );
    return res.json({ token, message: 'Login successful' });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
