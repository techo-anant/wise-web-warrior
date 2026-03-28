const express = require('express');
const router = express.Router();
const {
    getAllDealers,
    getDealerById,
    getDealersByCity,
    createDealer,
    updateDealer,
    deleteDealer,
} = require('../controllers/dealerController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// ── PUBLIC ROUTES ──
router.get('/', getAllDealers);
router.get('/search', getDealersByCity);
router.get('/:id', getDealerById);

// ── ADMIN ONLY ROUTES ──
router.post('/', authMiddleware, adminMiddleware, createDealer);
router.put('/:id', authMiddleware, adminMiddleware, updateDealer);
router.delete('/:id', authMiddleware, adminMiddleware, deleteDealer);

module.exports = router;