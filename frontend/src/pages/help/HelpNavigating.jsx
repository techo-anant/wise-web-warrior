import React from 'react';
import './Help.css';

const HelpNavigating = () => {
  return (
    <div className="help-page-container">
      <h1>Help: <span>Website Navigation</span></h1>
      <section className="help-content">
        <h3>Using the Navigation Bar</h3>
        <p>The navigation bar at the top is your primary tool for moving through the site:</p>
        <ul>
          <li><strong>Logo:</strong> Click the "Wise Web Warriors" logo to return home instantly.</li>
          <li><strong>Inventory:</strong> View all available vehicles in our showroom.</li>
          <li><strong>Compare:</strong> Make deatiled comparisons among 2 - 3 vehicles simulatneously.</li>
          <li><strong>About Us:</strong> Get to know more about our company.</li>
          <li><strong>Contact:</strong> Get latest information fo contacting Us.</li>
          <li><strong>FAQ:</strong> View answers to some of the most frequently asked questions.</li>
          <li><strong>Find Dealership:</strong> Find our dalership location.</li>
        </ul>
        <h3>Theme Switching</h3>
        <p>Use the <strong>Theme Toggle</strong> button in the header to switch between Default(Bright), Dark, and Sport modes to suit your preference.</p>
      </section>
    </div>
  );
};

export default HelpNavigating;