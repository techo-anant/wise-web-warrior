const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    disableUser,
    promoteUser,
    getProfile,
    updateProfile,
} = require('../controllers/userController');

const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// ── USER ROUTES (private) ──
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);

// ── ADMIN ROUTES (admin only) ──
router.get('/', authMiddleware, adminMiddleware, getAllUsers);
router.put('/:id/disable', authMiddleware, adminMiddleware, disableUser);
router.put('/:id/promote', authMiddleware, adminMiddleware, promoteUser);

module.exports = router;