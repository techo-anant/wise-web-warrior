import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Wise Web <span>Warriors</span></h3>
          <p>The premium destination for quality pre-owned vehicles.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/inventory">Browse Inventory</a></li>
            <li><a href="/financing">Financing</a></li>
            <li><a href="/faq">FAQs</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>123 Dealership Way</p>
          <p>Phone: (555) 012-3456</p>
        </div>

        <div className="footer-section">
          <h4>Help</h4>
          <ul>
            <li><Link to="/help/login-register">Login and register</Link></li>
            <li><Link to="/help/navigating">Navigating through website</Link></li>
            <li><Link to="/help/filters">Filter functionality</Link></li>
            <li><Link to="/help/compare">Compare functionality</Link></li>
            <li><Link to="/help/admin">Admin permissions</Link></li>
          </ul>
        </div>
      </div>

      
      <div className="footer-bottom">
        <p>&copy; 2026 Wise Web Warriors. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
