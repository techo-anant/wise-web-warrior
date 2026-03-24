const db = require('../config/db');

const User = {
    findByEmail: async (email) => {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },

    findById: async (id) => {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    },

    create: async ({ name, email, hashedPassword, role = 'user' }) => {
        const [result] = await db.query(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role]
        );
        return result.insertId;
    },

    update: async (id, { name, email }) => {
        await db.query(
            'UPDATE users SET name = ?, email = ? WHERE id = ?',
            [name, email, id]
        );
    },

    disable: async (id) => {
        await db.query('UPDATE users SET is_active = 0 WHERE id = ?', [id]);
    },

    promote: async (id) => {
        await db.query('UPDATE users SET role = "admin" WHERE id = ?', [id]);
    },

    getAll: async () => {
        const [rows] = await db.query(
            'SELECT id, name, email, role, is_active, created_at FROM users'
        );
        return rows;
    },
};

module.exports = User;