const db = require('../config/db');

const Dealer = {
    // Get all active dealer locations
    getAll: async () => {
        const [rows] = await db.query(
            'SELECT * FROM dealers WHERE is_active = 1 ORDER BY city ASC'
        );
        return rows;
    },

    // Get single dealer by ID
    findById: async (id) => {
        const [rows] = await db.query(
            'SELECT * FROM dealers WHERE id = ? AND is_active = 1',
            [id]
        );
        return rows[0];
    },

    // Get dealers by city
    findByCity: async (city) => {
        const [rows] = await db.query(
            'SELECT * FROM dealers WHERE city LIKE ? AND is_active = 1',
            [`%${city}%`]
        );
        return rows;
    },

    // Create dealer (admin)
    create: async (data) => {
        const {
            name, address, city, province, postal_code,
            phone, email, latitude, longitude, hours
        } = data;

        const [result] = await db.query(
            `INSERT INTO dealers 
        (name, address, city, province, postal_code, phone, email, latitude, longitude, hours)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, address, city, province, postal_code, phone, email, latitude, longitude, hours]
        );
        return result.insertId;
    },

    // Update dealer (admin)
    update: async (id, data) => {
        const {
            name, address, city, province, postal_code,
            phone, email, latitude, longitude, hours
        } = data;

        await db.query(
            `UPDATE dealers SET
        name=?, address=?, city=?, province=?, postal_code=?,
        phone=?, email=?, latitude=?, longitude=?, hours=?
       WHERE id = ?`,
            [name, address, city, province, postal_code, phone, email, latitude, longitude, hours, id]
        );
    },

    // Soft delete dealer (admin)
    delete: async (id) => {
        await db.query('UPDATE dealers SET is_active = 0 WHERE id = ?', [id]);
    },
};

module.exports = Dealer;