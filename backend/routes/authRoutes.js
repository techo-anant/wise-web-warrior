const express = require('express');
const router = express.Router();
const { register, login, logout, getMe } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Private route — requires token
router.get('/me', authMiddleware, getMe);

module.exports = router;