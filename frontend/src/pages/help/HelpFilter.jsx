import React from 'react';
import './Help.css';

const HelpFilter = () => {
  return (
    <div className="help-page-container">
      <h1>Help: <span>Filter Functionality</span></h1>
      <section className="help-content">
        <h3>Finding the Right Car</h3>
        <p>On the <strong>Inventory</strong> page, use the sidebar filters to narrow down your search:</p>
        <ul>
          <li><strong>Make/Model:</strong> Search for specific brands like Toyota or Tesla.</li>
          <li><strong>Category:</strong> Filter by vehicle type (SUV, Sedan, Truck, etc.).</li>
          <li><strong>Price Range:</strong> Set a budget to see only what fits your wallet.</li>
          <li><strong>Transmission:</strong> Choose between Automatic or Manual options.</li>
        </ul>
        <p>Filters update the list in real-time, helping you find your "Perfect Drive" faster.</p>
      </section>
    </div>
  );
};

export default HelpFilter;