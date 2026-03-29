const express = require('express');
const cors = require('cors');

const authRoutes = require('../routes/authRoutes');
const userRoutes = require('../routes/userRoutes');
const carRoutes = require('../routes/carRoutes');
const dealerRoutes = require('../routes/dealerRoutes');
const monitorRoutes = require('../routes/monitorRoutes');

const app = express();

app.use(cors({
    origin: [
        'https://wise-web-warrior.vercel.app',
        'https://wise-web-warrior-git-main-techo-anants-projects.vercel.app',
        'https://wise-web-warrior-qxchxgsng-techo-anants-projects.vercel.app',
        'http://localhost:3000'
    ]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/dealers', dealerRoutes);
app.use('/api/monitor', monitorRoutes);

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