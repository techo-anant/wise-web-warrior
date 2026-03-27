// import React from "react";

// function Contact() {
//   return <h2>Contact Us</h2>;
// }

// export default Contact;

// earlier code above ^^^^^^^^^^^^^^^^^^
// new code [INDER] below


import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! Our team will get back to you shortly.");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <h1>Get in <span>Touch</span></h1>
        <p>Have questions about a vehicle? We're here to help.</p>
      </section>

      <div className="contact-container">
        {/* --- CONTACT FORM --- */}
        <div className="contact-form-section">
          <h2>Send us a <span>Message</span></h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <select name="subject" value={formData.subject} onChange={handleChange} required>
                <option value="" disabled>Select Subject</option>
                <option value="Inquiry">General Inquiry</option>
                <option value="Test Drive">Schedule Test Drive</option>
                <option value="Finance">Financing Options</option>
              </select>
            </div>
            <div className="form-group">
              <textarea name="message" placeholder="How can we help you?" rows="5" value={formData.message} onChange={handleChange} required></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>

        {/* --- SHOWROOM INFO --- */}
        <div className="contact-info-section">
          <div className="info-card">
            <h3>Showroom <span>Location</span></h3>
            <p>123 Luxury Drive, Automotive Hub</p>
            <p>LaSalle, ON, Canada</p>
          </div>

          <div className="info-card">
            <h3>Business <span>Hours</span></h3>
            <p>Mon - Fri: 9:00 AM - 8:00 PM</p>
            <p>Saturday: 10:00 AM - 6:00 PM</p>
            <p>Sunday: Closed</p>
          </div>

          <div className="info-card">
            <h3>Direct <span>Contact</span></h3>
            <p><strong>Phone:</strong> +1 (555) 012-3456</p>
            <p><strong>Email:</strong> sales@showroom.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
