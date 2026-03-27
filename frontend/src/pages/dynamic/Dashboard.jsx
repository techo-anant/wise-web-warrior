import React from 'react';
import '../dynamic/Auth.css';

const Dashboard = ({ user }) => {
  return (
    <div className="compare-page"> 
      <header className="compare-header">
        <h1>User <span>Dashboard</span></h1>
        <p>Welcome back, <strong>{user?.name}</strong>! Here is your profile overview.</p>
      </header>

      <div className="compare-table-container">
        <div className="user-profile-card" style={{ color: 'var(--text-color)' }}>
          <div style={{ marginBottom: '30px', borderBottom: '1px solid rgba(128,128,128,0.2)', paddingBottom: '15px' }}>
            <h3>Account Details</h3>
            <p style={{ opacity: 0.8 }}>Manage your personal information and preferences.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div className="stat-box" style={{ background: 'rgba(var(--accent-rgb), 0.1)', padding: '20px', borderRadius: '15px' }}>
              <h4 style={{ color: 'var(--accent-color)', margin: '0 0 10px 0' }}>Membership</h4>
              <p style={{ fontSize: '1.2rem', fontWeight: '700' }}>{user?.role === 'admin' ? 'Premium Admin' : 'Showroom Member'}</p>
            </div>
            
            <div className="stat-box" style={{ background: 'rgba(var(--accent-rgb), 0.1)', padding: '20px', borderRadius: '15px' }}>
              <h4 style={{ color: 'var(--accent-color)', margin: '0 0 10px 0' }}>Saved Vehicles</h4>
              <p style={{ fontSize: '1.2rem', fontWeight: '700' }}>0 Units</p>
            </div>

            <div className="stat-box" style={{ background: 'rgba(var(--accent-rgb), 0.1)', padding: '20px', borderRadius: '15px' }}>
              <h4 style={{ color: 'var(--accent-color)', margin: '0 0 10px 0' }}>Active Quotes</h4>
              <p style={{ fontSize: '1.2rem', fontWeight: '700' }}>None</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
