const express = require('express');
const router = express.Router();
const {
  getAllCars,
  getCarById,
  searchCars,
  createCar,
  updateCar,
  deleteCar,
} = require('../controllers/carController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// ── PUBLIC ROUTES ──
router.get('/', getAllCars);
router.get('/search', searchCars);
router.get('/:id', getCarById);

// ── ADMIN ONLY ROUTES ──
router.post('/', authMiddleware, adminMiddleware, createCar);
router.put('/:id', authMiddleware, adminMiddleware, updateCar);
router.delete('/:id', authMiddleware, adminMiddleware, deleteCar);

module.exports = router;