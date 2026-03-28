import React from 'react';
import './Help.css';

const HelpAdminPrmissnNavi = () => {
  return (
    <div className="help-page-container">
      <h1>Help: <span>Admin Permissions</span></h1>
      <section className="help-content">
        <h3>Admin Access</h3>
        <p>Users with Administrative privileges have access to the <strong>Admin Dashboard</strong>.</p>
        <h3>Permissions include:</h3>
        <ul>
          <li><strong>Add Vehicles:</strong> Upload new inventory details and images.</li>
          <li><strong>Edit/Delete:</strong> Modify existing car listings or remove sold inventory.</li>
          <li><strong>User Management:</strong> View registered user inquiries.</li>
        </ul>
        <h3>Navigation</h3>
        <p>When logged in as an Admin, a special "Admin" link will appear in your navigation bar or user dropdown menu.</p>
      </section>
    </div>
  );
};

export default HelpAdminPrmissnNavi;