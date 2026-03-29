import React from 'react';
import VideoPlayer from '../../components/media/VideoPlayer';
import './Help.css';

const HelpComparison = () => {
  return (
    <div className="help-page-container">
      <h1>Help: <span>Vehicle Comparison</span></h1>
      <div className="help-main-layout">
        <section className="help-content">
          <h3>Comparing Models</h3>
          <p>Our comparison tool allows you to see specifications side-by-side to help you make the best choice.</p>
          <ol>
            <li>Navigate to the <strong>Inventory</strong> page.</li>
            <li>Click the "Add to Compare" icon on up to three vehicles.</li>
            <li>Open the <strong>Comparison Tray</strong> at the bottom of the screen.</li>
            <li>Review the differences in Engine, Fuel Economy, and Price.</li>
          </ol>
        </section>

        <div className="help-video-section">
          <VideoPlayer 
            videoId="1SRtDtvOChj_DpdSyjTX-3Jf8pi_vkuLd" 
            title="Comparison Tool Guide" 
          />
        </div>
      </div>
    </div>
  );
};

export default HelpComparison;