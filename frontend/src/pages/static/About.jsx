import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <div className="hero-overlay">
          <h1>Driven by <span>Excellence</span></h1>
          <p>Redefining the digital showroom experience since 2025.</p>
        </div>
      </section>

      <section className="about-content">
        <div className="about-text-wrapper">
          <h2>Our <span>Mission</span></h2>
          <p>
            Welcome to our premium car showroom. We believe that buying a car should be as 
            seamless as driving one. Our platform combines high-performance web architecture 
            with a curated inventory to bring you the best automotive deals.
          </p>
          <p>
            Whether you are looking for a brand-new 2027 model or a reliable used workhorse, 
            our advanced filtering systems—including our custom dual-node range sliders—ensure 
            you find exactly what fits your lifestyle.
          </p>
        </div>

        <div className="about-grid">
          <div className="stat-card">
            <h3>500+</h3>
            <p>Premium Vehicles</p>
          </div>
          <div className="stat-card">
            <h3>15+</h3>
            <p>Certified Partners</p>
          </div>
          <div className="stat-card">
            <h3>24/7</h3>
            <p>Support Available</p>
          </div>
          <div className="stat-card">
            <h3>100%</h3>
            <p>Secure Transactions</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
