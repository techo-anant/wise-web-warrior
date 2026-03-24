const Car = require('../models/Car');

// ── GET ALL CARS ──
const getAllCars = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const cars = await Car.getAll(page, limit);
        const total = await Car.getCount();

        res.status(200).json({
            cars,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// ── GET SINGLE CAR ──
const getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) return res.status(404).json({ message: 'Car not found' });

        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// ── SEARCH & FILTER CARS ──
const searchCars = async (req, res) => {
    try {
        const filters = {
            keyword: req.query.keyword,
            category: req.query.category,
            minPrice: req.query.minPrice,
            maxPrice: req.query.maxPrice,
            minYear: req.query.minYear,
            maxYear: req.query.maxYear,
            condition: req.query.condition,
        };

        const cars = await Car.search(filters);
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// ── CREATE CAR (admin) ──
const createCar = async (req, res) => {
    try {
        const carId = await Car.create(req.body);
        res.status(201).json({ message: 'Car listing created successfully', carId });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// ── UPDATE CAR (admin) ──
const updateCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) return res.status(404).json({ message: 'Car not found' });

        await Car.update(req.params.id, req.body);
        res.status(200).json({ message: 'Car listing updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// ── DELETE CAR (admin) ──
const deleteCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) return res.status(404).json({ message: 'Car not found' });

        await Car.delete(req.params.id);
        res.status(200).json({ message: 'Car listing removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getAllCars, getCarById, searchCars, createCar, updateCar, deleteCar };