const User = require('../models/User');

// ── GET ALL USERS (admin) ──
const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ── DISABLE USER (admin) ──
const disableUser = async (req, res) => {
  try {
    await User.disable(req.params.id);
    res.status(200).json({ message: 'User disabled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ── PROMOTE USER TO ADMIN (admin) ──
const promoteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.role === 'admin') {
      return res.status(400).json({ message: 'User is already an admin' });
    }

    await User.promote(req.params.id);
    res.status(200).json({ message: 'User promoted to admin successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ── GET PROFILE (logged in user) ──
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
        created_at: user.created_at,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ── UPDATE PROFILE (logged in user) ──
const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    await User.update(req.user.id, { name, email });
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getAllUsers, disableUser, promoteUser, getProfile, updateProfile };