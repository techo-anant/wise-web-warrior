import React from 'react';
import './Help.css';

const HelpComparison = () => {
  return (
    <div className="help-page-container">
      <h1>Help: <span>Compare Functionality</span></h1>
      <section className="help-content">
        <h3>Comparing Vehicles</h3>
        <p>Can't decide between two cars? Use our comparison tool:</p>
        <ol>
          <li>Navigate to the <strong>Inventory</strong> page.</li>
          <li>Click the <strong>Add to Compare</strong> icon on any vehicle card.</li>
          <li>Once you have 2 or 3 cars selected, click the <strong>Compare Now</strong> button.</li>
          <li>View a side-by-side breakdown of Engine specs, Mileage, and Price.</li>
        </ol>
      </section>
    </div>
  );
};

export default HelpComparison;