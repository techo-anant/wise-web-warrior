import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Static pages
import Home from '../pages/static/Home';
import About from '../pages/static/About';
import Contact from '../pages/static/Contact';
import FAQ from '../pages/static/FAQ';
import NotFound from '../pages/static/NotFound';

// Dynamic pages
import Inventory from '../pages/dynamic/Inventory';
import CarDetail from '../pages/dynamic/CarDetail';
import Compare from '../pages/dynamic/Compare';
import DealerLocator from '../pages/dynamic/DealerLocator';
import Financing from '../pages/dynamic/Financing';
import Dashboard from '../pages/dynamic/Dashboard';
import Profile from '../pages/dynamic/Profile';
// import SavedCars from '../pages/dynamic/SavedCars';
// import Notifications from '../pages/dynamic/Notifications';

// Auth pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
// import OAuthSuccess from '../pages/auth/OAuthSuccess';

// Admin pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import CarListingEditor from '../pages/admin/CarListingEditor';
import UserManager from '../pages/admin/UserManager';
import ThemeManager from '../pages/admin/ThemeManager';
import Monitor from '../pages/admin/Monitor';

function AppRouter({ user, setUser, currentTheme, setTheme , onLogout}) {

  // ── PRIVATE ROUTE WRAPPER ──
  // Redirects to login if user is not logged in
  const PrivateRoute = ({ element }) => {
    return user ? element : <Navigate to="/login" />;
  };

  // ── ADMIN ROUTE WRAPPER ──
  // Redirects to home if user is not admin
  const AdminRoute = ({ element }) => {
    if (!user) return <Navigate to="/login" />;
    if (user.role !== 'admin') return <Navigate to="/" />;
    return element;
  };

  return (
    <Routes>

      {/* ── STATIC ROUTES ── */}
      <Route path="/"               element={<Home />} />
      <Route path="/about"          element={<About />} />
      <Route path="/contact"        element={<Contact />} />
      <Route path="/faq"            element={<FAQ />} />

      {/* ── DYNAMIC ROUTES ── */}
      <Route path="/inventory"      element={<Inventory />} />
      <Route path="/inventory/:id"  element={<CarDetail />} />
      <Route path="/compare"        element={<Compare />} />
      <Route path="/dealer-locator" element={<DealerLocator />} />
      <Route path="/financing"      element={<Financing />} />

      {/* ── AUTH ROUTES ── */}
      <Route path="/login"           element={<Login setUser={setUser} />} />
      <Route path="/register"        element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* <Route path="/oauth-success"   element={<OAuthSuccess setUser={setUser} />} /> */}

      {/* ── PRIVATE ROUTES (login required) ── */}
      <Route path="/dashboard"      element={<PrivateRoute element={<Dashboard user={user} />} />} />
      {/* Protected Profile Route */}
       <Route 
         path="/profile" 
         element={
           user ? (
             <Profile user={user} setUser={setUser} onLogout={onLogout} />
           ) : (
             <Navigate to="/login" />
           )
         } 
       />
      {/* <Route path="/saved-cars"     element={<PrivateRoute element={<SavedCars user={user} />} />} /> */}
      {/* <Route path="/notifications"  element={<PrivateRoute element={<Notifications user={user} />} />} /> */}

      {/* ── ADMIN ROUTES (admin only) ── */}
      <Route path="/admin"          element={<AdminRoute element={<AdminDashboard user={user} />} />} />
      <Route path="/admin/cars"     element={<AdminRoute element={<CarListingEditor />} />} />
      <Route path="/admin/users"    element={<AdminRoute element={<UserManager />} />} />
      <Route path="/admin/monitor"  element={<AdminRoute element={<Monitor />} />} />
      <Route path="/admin/themes"   element={<AdminRoute element={<ThemeManager currentTheme={currentTheme} setTheme={setTheme} />} />} />

      {/* ── 404 ── */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default AppRouter;


// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// import Home from '../pages/static/Home';
// import About from '../pages/static/About';
// import Inventory from '../pages/dynamic/Inventory';
// import CarDetail from '../pages/dynamic/CarDetail';
// import Contact from '../pages/static/Contact';
// import FAQ from '../pages/static/FAQ';
// import Dashboard from '../pages/dynamic/Dashboard';
// import AdminDashboard from '../pages/admin/AdminDashboard';
// import Profile from '../pages/dynamic/Profile'; // Ensure this is imported
// import Login from '../pages/auth/Login'; 
// import Register from '../pages/auth/Register';
// import ForgotPassword from '../pages/auth/ForgotPassword';
// import NotFound from '../pages/static/NotFound';
// import Compare from '../pages/dynamic/Compare';
// import DealerLocator from '../pages/dynamic/DealerLocator';
// import Financing from '../pages/dynamic/Financing'; 

// function AppRouter({ user, setUser, onLogout }) {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/inventory" element={<Inventory />} />
//       <Route path="/inventory/:id" element={<CarDetail />} />
//       <Route path="/financing" element={<Financing />} />
//       <Route path="/about" element={<About />} />
//       <Route path="/contact" element={<Contact />} />
//       <Route path="/faq" element={<FAQ />} />
//       <Route path="/login" element={<Login setUser={setUser} />} />
//       <Route path="/forgot-password" element={<ForgotPassword />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/compare" element={<Compare />} />
//       <Route path="/dealer-locator" element={<DealerLocator />} />
      
//       {/* Protected Profile Route */}
//       <Route 
//         path="/profile" 
//         element={
//           user ? (
//             <Profile user={user} setUser={setUser} onLogout={onLogout} />
//           ) : (
//             <Navigate to="/login" />
//           )
//         } 
//       />

//       {/* Protected Dashboard Route */}
//       <Route 
//         path="/dashboard" 
//         element={
//           user ? (
//             user.role === 'admin' ? 
//             <AdminDashboard user={user} /> : 
//             <Dashboard user={user} />
//           ) : (
//             <Navigate to="/login" />
//           )
//         } 
//       />

//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// }

// export default AppRouter;