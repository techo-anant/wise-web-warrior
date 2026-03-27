import React from 'react';
import '../../pages/dynamic/Auth.css'; 

const AdminDashboard = ({ user }) => {
  return (
    <div className="compare-page">
      <header className="compare-header">
        <h1 style={{ color: 'var(--accent-color)' }}>Admin <span>Control Center</span></h1>
        <p>System Overview & Management Tools</p>
      </header>

      <div className="compare-table-container">
        <div className="admin-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', color: 'var(--text-color)' }}>
          
          <div className="admin-card" style={{ background: 'var(--bg-color)', padding: '25px', borderRadius: '20px', border: '1px solid var(--accent-color)' }}>
            <h3>📦 Inventory Management</h3>
            <p>Update vehicle prices, add new stock, or mark vehicles as sold.</p>
            <button className="clear-all-btn" style={{ fontSize: '0.7rem' }}>Update Stock</button>
          </div>

          <div className="admin-card" style={{ background: 'var(--bg-color)', padding: '25px', borderRadius: '20px', border: '1px solid var(--accent-color)' }}>
            <h3>👥 User Overview</h3>
            <p>View registered members and manage account permissions.</p>
            <button className="clear-all-btn" style={{ fontSize: '0.7rem' }}>View Users</button>
          </div>

          <div className="admin-card" style={{ background: 'var(--bg-color)', padding: '25px', borderRadius: '20px', border: '1px solid var(--accent-color)', gridColumn: 'span 2' }}>
            <h3>📈 Showroom Analytics</h3>
            <p>Most viewed car: <strong>Porsche Night Rider</strong></p>
            <p>Total Website Traffic: <strong>1,240 visits this week</strong></p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
