import React from 'react';
import VideoPlayer from '../../components/media/VideoPlayer';
import './Help.css';

const HelpFilter = () => {
  return (
    <div className="help-page-container">
      <h1>Help: <span>Searching & Filtering</span></h1>
      <div className="help-main-layout">
        <section className="help-content">
          <h3>Finding Your Vehicle</h3>
          <p>Use our advanced filters to narrow down the perfect match for your needs.</p>
          <ul>
            <li><strong>Price Range:</strong> Adjust the slider to fit your budget.</li>
            <li><strong>Body Style:</strong> Filter by SUV, Sedan, or Truck.</li>
            <li><strong>Fuel Type:</strong> Select from Electric, Hybrid, or Gasoline.</li>
          </ul>
          <p>You can clear all filters at any time by clicking the <strong>"Reset Filters"</strong> button at the top of the sidebar.</p>
        </section>

        <div className="help-video-section">
          <VideoPlayer 
            videoId="1LE14u8m-BLfziiFrVOvzRkFa6EqGK9in" 
            title="Filtering Tutorial" 
          />
        </div>
      </div>
    </div>
  );
};

export default HelpFilter;