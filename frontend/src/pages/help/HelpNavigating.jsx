import React from 'react';
import VideoPlayer from '../../components/media/VideoPlayer';
import './Help.css';

const HelpNavigating = () => {
  return (
    <div className="help-page-container">
      <h1>Help: <span>Getting Around</span></h1>
      <div className="help-main-layout">
        <section className="help-content">
          <h3>Main Navigation</h3>
          <p>The top navigation bar is your primary way to move through the application.</p>
          <ul>
            <li><strong>Home:</strong> View featured vehicles and latest news.</li>
            <li><strong>Inventory:</strong> Browse our full collection of cars.</li>
            <li><strong>Help Center:</strong> Access these tutorials and FAQs.</li>
          </ul>
          <h3>Mobile Navigation</h3>
          <p>On smaller screens, use the "Hamburger" menu icon in the top right to expand the navigation links.</p>
        </section>

        <div className="help-video-section">
          <VideoPlayer 
            videoId="1HGzDC-C5JJEfGP85IQFNMD4tDSUEEOTG" 
            title="Navigation Guide" 
          />
        </div>
      </div>
    </div>
  );
};

export default HelpNavigating;