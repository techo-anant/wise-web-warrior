import React, {memo} from "react";
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
import SavedCars from '../pages/dynamic/SavedCars';

// Auth pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
// import ForgotPassword from '../pages/auth/ForgotPassword'; // Commented out per your request

// Admin pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import CarListingEditor from '../pages/admin/CarListingEditor';
import UserManager from '../pages/admin/UserManager';
import ThemeManager from '../pages/admin/ThemeManager';
import Monitor from '../pages/admin/Monitor';

// help Pages
import HelpLoginRegister from '../pages/help/HelpLoginRegister';
import HelpNavigating from '../pages/help/HelpNavigating';
import HelpFilter from '../pages/help/HelpFilter';
import HelpComparison from '../pages/help/HelpComparison';
/* FIXED: Renamed the import to match the element name used below */
import HelpAdminPrmissnNavi from '../pages/help/HelpAdminPrmissnNavi';

const AppRouter = memo(({ user, setUser, currentTheme, setTheme, onLogout }) => {

  // ── PRIVATE ROUTE WRAPPER ──
  const PrivateRoute = ({ element }) => {
    return user? element : <Navigate to="/login" />;
  };

  // ── ADMIN ROUTE WRAPPER ──
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
        <Route path="/saved-cars" element={
            <PrivateRoute user={user} element={<SavedCars user={user} />} />
        } />

      {/* ── AUTH ROUTES ── */}
      <Route path="/login"           element={<Login setUser={setUser} />} />
      <Route path="/register"        element={<Register setUser={setUser} />} />
      {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}

      {/* ── PRIVATE ROUTES ── */}
      <Route path="/dashboard"      element={<PrivateRoute element={<Dashboard user={user} />} />} />
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

      {/* ── ADMIN ROUTES ── */}
      <Route path="/admin"          element={<AdminRoute element={<AdminDashboard user={user} />} />} />
      <Route path="/admin/cars"     element={<AdminRoute element={<CarListingEditor />} />} />
      <Route path="/admin/users"    element={<AdminRoute element={<UserManager />} />} />
      <Route path="/admin/monitor"  element={<AdminRoute element={<Monitor />} />} />
      <Route path="/admin/themes"   element={<AdminRoute element={<ThemeManager currentTheme={currentTheme} setTheme={setTheme} />} />} />

      {/* ── HELP ROUTES ── */}
      <Route path="/help/login-register" element={<HelpLoginRegister />} />
      <Route path="/help/navigating"     element={<HelpNavigating />} />
      <Route path="/help/filters"        element={<HelpFilter />} />
      <Route path="/help/compare"        element={<HelpComparison />} />
      <Route path="/help/admin"          element={<HelpAdminPrmissnNavi />} />

      {/* ── 404 ── */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
});

export default AppRouter;