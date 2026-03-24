const db = require('../config/db');

const Car = {
    // Get all cars (paginated)
    getAll: async (page = 1, limit = 10) => {
        const offset = (page - 1) * limit;
        const [rows] = await db.query(
            'SELECT * FROM cars WHERE is_available = 1 ORDER BY created_at DESC LIMIT ? OFFSET ?',
            [limit, offset]
        );
        return rows;
    },

    // Get total count for pagination
    getCount: async () => {
        const [rows] = await db.query('SELECT COUNT(*) as total FROM cars WHERE is_available = 1');
        return rows[0].total;
    },

    // Get single car by ID
    findById: async (id) => {
        const [rows] = await db.query('SELECT * FROM cars WHERE id = ?', [id]);
        return rows[0];
    },

    // Search and filter cars
    search: async ({ keyword, category, minPrice, maxPrice, minYear, maxYear, condition }) => {
        let query = 'SELECT * FROM cars WHERE is_available = 1';
        const params = [];

        if (keyword) {
            query += ' AND (make LIKE ? OR model LIKE ?)';
            params.push(`%${keyword}%`, `%${keyword}%`);
        }
        if (category) {
            query += ' AND category = ?';
            params.push(category);
        }
        if (minPrice) {
            query += ' AND price >= ?';
            params.push(minPrice);
        }
        if (maxPrice) {
            query += ' AND price <= ?';
            params.push(maxPrice);
        }
        if (minYear) {
            query += ' AND year >= ?';
            params.push(minYear);
        }
        if (maxYear) {
            query += ' AND year <= ?';
            params.push(maxYear);
        }
        if (condition) {
            query += ' AND condition = ?';
            params.push(condition);
        }

        const [rows] = await db.query(query, params);
        return rows;
    },

    // Create new car listing
    create: async (data) => {
        const {
            make, model, year, price, mileage, category,
            condition, color, transmission, fuel_type,
            engine, description, image_url, video_url
        } = data;

        const [result] = await db.query(
            `INSERT INTO cars 
        (make, model, year, price, mileage, category, condition, color, transmission, fuel_type, engine, description, image_url, video_url) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [make, model, year, price, mileage, category, condition, color, transmission, fuel_type, engine, description, image_url, video_url]
        );
        return result.insertId;
    },

    // Update car listing
    update: async (id, data) => {
        const {
            make, model, year, price, mileage, category,
            condition, color, transmission, fuel_type,
            engine, description, image_url, video_url
        } = data;

        await db.query(
            `UPDATE cars SET 
        make=?, model=?, year=?, price=?, mileage=?, category=?, condition=?, 
        color=?, transmission=?, fuel_type=?, engine=?, description=?, 
        image_url=?, video_url=?
       WHERE id = ?`,
            [make, model, year, price, mileage, category, condition, color, transmission, fuel_type, engine, description, image_url, video_url, id]
        );
    },

    // Delete car listing
    delete: async (id) => {
        await db.query('UPDATE cars SET is_available = 0 WHERE id = ?', [id]);
    },
};

module.exports = Car;