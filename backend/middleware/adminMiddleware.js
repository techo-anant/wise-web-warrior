const adminMiddleware = (req, res, next) => {
    // if not an admin 
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
};

module.exports = adminMiddleware;