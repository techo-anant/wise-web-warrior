const express = require('express');
const router = express.Router();
const { getStatus } = require('../controllers/monitorController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// ── ADMIN ONLY — monitor should not be publicly accessible ──
router.get('/status', authMiddleware, adminMiddleware, getStatus);

module.exports = router;