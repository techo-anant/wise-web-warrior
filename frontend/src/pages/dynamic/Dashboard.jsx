import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getProfile } from '../../services/userService';
import { getAllCars } from '../../services/carService';
import '../dynamic/Auth.css';

const Dashboard = ({ user }) => {
  const [profile, setProfile] = useState(null);
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch real profile from backend
        const profileData = await getProfile();
        setProfile(profileData);

        // Fetch a few featured cars to display
        const carData = await getAllCars(1, 3);
        setFeaturedCars(carData.cars);
      } catch (err) {
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="compare-page"><p>Loading dashboard...</p></div>;
  if (error) return <div className="compare-page"><p style={{ color: 'red' }}>{error}</p></div>;

  return (
    <div className="compare-page">
      <header className="compare-header">
        <h1>User <span>Dashboard</span></h1>
        <p>Welcome back, <strong>{profile?.name}</strong>! Here is your profile overview.</p>
      </header>

      <div className="compare-table-container">
        <div className="user-profile-card" style={{ color: 'var(--text-color)' }}>

          {/* ── ACCOUNT DETAILS ── */}
          <div style={{ marginBottom: '30px', borderBottom: '1px solid rgba(128,128,128,0.2)', paddingBottom: '15px' }}>
            <h3>Account Details</h3>
            <p style={{ opacity: 0.8 }}>Manage your personal information and preferences.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            <div className="stat-box" style={{ background: 'rgba(var(--accent-rgb), 0.1)', padding: '20px', borderRadius: '15px' }}>
              <h4 style={{ color: 'var(--accent-color)', margin: '0 0 10px 0' }}>Membership</h4>
              <p style={{ fontSize: '1.2rem', fontWeight: '700' }}>
                {profile?.role === 'admin' ? 'Premium Admin' : 'Showroom Member'}
              </p>
            </div>

            <div className="stat-box" style={{ background: 'rgba(var(--accent-rgb), 0.1)', padding: '20px', borderRadius: '15px' }}>
              <h4 style={{ color: 'var(--accent-color)', margin: '0 0 10px 0' }}>Email</h4>
              <p style={{ fontSize: '1rem', fontWeight: '600' }}>{profile?.email}</p>
            </div>

            <div className="stat-box" style={{ background: 'rgba(var(--accent-rgb), 0.1)', padding: '20px', borderRadius: '15px' }}>
              <h4 style={{ color: 'var(--accent-color)', margin: '0 0 10px 0' }}>Member Since</h4>
              <p style={{ fontSize: '1rem', fontWeight: '600' }}>
                {new Date(profile?.created_at).toLocaleDateString('en-CA', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* ── QUICK LINKS ── */}
          <div style={{ marginBottom: '40px', borderBottom: '1px solid rgba(128,128,128,0.2)', paddingBottom: '30px' }}>
            <h3 style={{ marginBottom: '15px' }}>Quick Links</h3>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <Link to="/profile" className="auth-btn" style={{ textDecoration: 'none', padding: '10px 20px' }}>
                Edit Profile
              </Link>
              <Link to="/inventory" className="auth-btn" style={{ textDecoration: 'none', padding: '10px 20px', background: 'transparent', border: '1px solid var(--accent-color)', color: 'var(--accent-color)' }}>
                Browse Cars
              </Link>
              {profile?.role === 'admin' && (
                <Link to="/admin" className="auth-btn" style={{ textDecoration: 'none', padding: '10px 20px', background: 'var(--accent-color)' }}>
                  Admin Panel
                </Link>
              )}
            </div>
          </div>

          {/* ── FEATURED CARS FROM BACKEND ── */}
          <div>
            <h3 style={{ marginBottom: '15px' }}>Latest Listings</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              {featuredCars.map((car) => (
                <div
                  key={car.id}
                  onClick={() => navigate(`/inventory/${car.id}`)}
                  style={{
                    background: 'rgba(var(--accent-rgb), 0.05)',
                    border: '1px solid rgba(var(--accent-rgb), 0.2)',
                    borderRadius: '12px',
                    padding: '15px',
                    cursor: 'pointer',
                  }}
                >
                  <h4 style={{ color: 'var(--accent-color)', margin: '0 0 8px 0' }}>
                    {car.year} {car.make} {car.model}
                  </h4>
                  <p style={{ margin: '0 0 5px 0', opacity: 0.8 }}>
                    ${Number(car.price).toLocaleString()}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.6 }}>
                    {Number(car.mileage).toLocaleString()} km · {car.transmission}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;