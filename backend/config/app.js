const express = require('express');
const cors = require('cors');

const authRoutes = require('../routes/authRoutes');
const userRoutes = require('../routes/userRoutes');
const carRoutes = require('../routes/carRoutes')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── ROUTES ──
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'CarDeals API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Local: http://localhost:${PORT}`);
    console.log(`API:   http://localhost:${PORT}/api`);
});


module.exports = app;


// ---

// **Flow summary:**

// Seed DB        →  admin@cardeals.com is seeded as admin by default
// Admin login    →  POST /api/auth/login  →  gets JWT with role: admin
// Promote user   →  PUT /api/users/:id/promote  →  admin only
// Disable user   →  PUT /api/users/:id/disable  →  admin only


// GET     /api/cars              → all cars (paginated)
// GET     /api/cars/search       → filter by keyword, price, year, category
// GET     /api/cars/:id          → single car
// POST    /api/cars              → create car (admin only)
// PUT     /api/cars/:id          → update car (admin only)
// DELETE  /api/cars/:id          → remove car (admin only)


// When you run `npm run dev` you'll see:
// Server running on port 5000
// Local: http://localhost:5000
// API:   http://localhost:5000/api