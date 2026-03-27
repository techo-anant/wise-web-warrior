import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from '../pages/static/Home';
import About from '../pages/static/About';
import Inventory from '../pages/dynamic/Inventory';
import CarDetail from '../pages/dynamic/CarDetail';
import Contact from '../pages/static/Contact';
import FAQ from '../pages/static/FAQ';
import Dashboard from '../pages/dynamic/Dashboard';
import AdminDashboard from '../pages/admin/AdminDashboard';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import NotFound from '../pages/static/NotFound';
import Compare from '../pages/dynamic/Compare';
import DealerLocator from '../pages/dynamic/DealerLocator';
import Financing from '../pages/dynamic/Financing';

function AppRouter({ user, setUser }) {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory/:id" element={<CarDetail />} />
            <Route path="/financing" element={<Financing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/dealer-locator" element={<DealerLocator />} />

            <Route
                path="/dashboard"
                element={
                    user ? (
                        user.role === 'admin' ?
                            <AdminDashboard user={user} /> :
                            <Dashboard user={user} />
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRouter;