import React from 'react';
import { Navigate } from 'react-router-dom';

// Redirects to login if user is not logged in
// Redirects to home if logged in but not admin (for admin routes)
const PrivateRoute = ({ element, user, adminOnly = false }) => {
    if (!user) return <Navigate to="/login" />;
    if (adminOnly && user.role !== 'admin') return <Navigate to="/" />;
    return element;
};

export default PrivateRoute;