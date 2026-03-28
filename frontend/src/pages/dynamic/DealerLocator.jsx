import React from 'react';
import './DealerLocator.css';

import DealershipMap from '../../components/map/DealershipMap';

const DealerLocator = () => {
  const businessAddress = "Aliens Native Site - Cabo de Hornos, Magallanes and Chilean Antarctica, Chile";
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY_HERE&q=${encodeURIComponent(businessAddress)}`;
  
  const freeMapUrl = "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1190.0030923663626!2d-69.26636051348868!3d-55.54418756217845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sca!4v1774482788384!5m2!1sen!2sca";

  return (
    <div className="locator-page">
      <div className="locator-container">
        <div className="map-section">
          < DealershipMap freeMapUrl={freeMapUrl} />
        </div>
        <div className="info-section">
          <div className="info-content">
            <h1>Warriors <span>Showroom</span></h1>
            <p className="subtitle">Visit our flagship location for a test drive.</p>
            
            <div className="info-group">
              <h4>Location</h4>
              <p>{businessAddress}</p>
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(businessAddress)}`} 
                target="_blank" 
                rel="noreferrer" 
                className="directions-link"
              >
                Get Directions
              </a>
            </div>

            <div className="info-group">
              <h4>Operating Hours</h4>
              <div className="hours-row">
                <span>Monday - Friday</span>
                <span>9:00 AM - 8:00 PM</span>
              </div>
              <div className="hours-row">
                <span>Saturday - Sunday</span>
                <span>10:00 AM - 6:00 PM</span>
              </div>
            </div>

            <div className="info-group">
              <h4>Contact Us</h4>
              <p>☎️ +1(771)721-0576</p>
              <p>🖥️ sales@cardeals.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealerLocator;
