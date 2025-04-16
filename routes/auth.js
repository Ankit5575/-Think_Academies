const express = require('express');
const router = express.Router();
const { login } = require('../middleware/auth');

// Login route
router.post('/login', login);

module.exports = router; 