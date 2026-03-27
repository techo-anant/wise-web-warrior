// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Home from "../pages/static/Home";
// import Inventory from "../pages/dynamic/Inventory";
// import CarDetail from "../pages/dynamic/CarDetail";
// import Category from "../pages/dynamic/Category";

// function About() {
//   return (
//     <div>
//       <h2>About Page</h2>
//       <p>About our business.</p>
//     </div>
//   );
// }

// function Contact() {
//   return (
//     <div>
//       <h2>Contact Page</h2>
//       <p>Contact us here.</p>
//     </div>
//   );
// }

// function FAQ() {
//   return (
//     <div>
//       <h2>FAQ Page</h2>
//       <p>Frequently Asked Questions.</p>
//     </div>
//   );
// }

// function NotFound() {
//   return <h2>404 - Page Not Found</h2>;
// }

// function AppRouter() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/about" element={<About />} />
//       <Route path="/contact" element={<Contact />} />
//       <Route path="/faq" element={<FAQ />} />
//       <Route path="*" element={<NotFound />} />
//       <Route path="/inventory" element={<Inventory />} />
//       <Route path="/cars/:id" element={<CarDetail />} />
//       <Route path="/category/:category" element={<Category />} />
//     </Routes>
//   );
// }

// export default AppRouter;


//earlier one above^^^^^^^^^^^^^^^^^^^^
//new commit [INDER] below

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
      
      {/* Dynamic Dashboard Route */}
      <Route 
        path="/dashboard" 
        element={
          user ? (
            user.role === 'admin' ? 
            <AdminDashboard user={user} /> : 
            <Dashboard user={user} />
          ) : (
            <Navigate to="/login" /> // Redirect to login if not authenticated
          )
        } 
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
