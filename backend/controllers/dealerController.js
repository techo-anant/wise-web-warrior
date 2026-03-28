const Dealer = require('../models/Dealer');

// ── GET ALL DEALERS ──
const getAllDealers = async (req, res) => {
    try {
        const dealers = await Dealer.getAll();
        res.status(200).json(dealers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// ── GET SINGLE DEALER ──
const getDealerById = async (req, res) => {
    try {
        const dealer = await Dealer.findById(req.params.id);
        if (!dealer) return res.status(404).json({ message: 'Dealer not found' });

        res.status(200).json(dealer);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// ── GET DEALERS BY CITY ──
const getDealersByCity = async (req, res) => {
    try {
        const dealers = await Dealer.findByCity(req.query.city);
        res.status(200).json(dealers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// ── CREATE DEALER (admin) ──
const createDealer = async (req, res) => {
    try {
        const dealerId = await Dealer.create(req.body);
        res.status(201).json({ message: 'Dealer created successfully', dealerId });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// ── UPDATE DEALER (admin) ──
const updateDealer = async (req, res) => {
    try {
        const dealer = await Dealer.findById(req.params.id);
        if (!dealer) return res.status(404).json({ message: 'Dealer not found' });

        await Dealer.update(req.params.id, req.body);
        res.status(200).json({ message: 'Dealer updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// ── DELETE DEALER (admin) ──
const deleteDealer = async (req, res) => {
    try {
        const dealer = await Dealer.findById(req.params.id);
        if (!dealer) return res.status(404).json({ message: 'Dealer not found' });

        await Dealer.delete(req.params.id);
        res.status(200).json({ message: 'Dealer removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getAllDealers,
    getDealerById,
    getDealersByCity,
    createDealer,
    updateDealer,
    deleteDealer,
};