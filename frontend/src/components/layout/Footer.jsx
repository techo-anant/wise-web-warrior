// import React from "react";
// import "./Footer.css"; // for styling

// function Footer() {
//   return (
//     <footer className="site-footer">
//       <p>&copy; 2026 Wise Web Warriors. All rights reserved.</p>
//     </footer>
//   );
// }

// export default Footer;

//earlier code above ^^^^^^^^^^^^^^^^^
// NEW CODE BELOW


import React from 'react';
import './Footer.css';

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
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2026 Wise Web Warriors. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
