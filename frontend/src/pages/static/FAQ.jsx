// import React from "react";

// function FAQ() {
//   return <h2>Frequently Asked Questions</h2>;
// }

// export default FAQ;

// earlier code above ^^^^^^^^^^^^
//NEW ONE BELOW

import React, { useState } from 'react';
import './FAQ.css';

const FAQ_DATA = [
  {
    id: 1,
    question: "What time does the dealership open for on Saturdays and Sundays?",
    answer: "On Saturdays, we are open from 10:00 AM to 6:00 PM to accommodate your weekend viewing. On Sundays, our physical showroom is closed, but our digital inventory and inquiry systems remain fully operational 24/7."
  },
  {
    id: 2,
    question: "What are the Guarantees and Warranties?",
    answer: "Every vehicle in our showroom undergoes a rigorous 150-point inspection. Brand new vehicles carry the full manufacturer warranty, while our certified pre-owned collection comes with a comprehensive 12-month / 20,000 km limited powertrain warranty."
  },
  {
    id: 3,
    question: "Are the first 5 services discounted?",
    answer: "Yes! As part of our 'Premium Ownership' package, your first 5 scheduled maintenance services (including oil changes and filter replacements) are discounted by 25% when booked through our official service center."
  },
  {
    id: 4,
    question: "How to book an appointment for a dealership tour?",
    answer: "You can book a VIP showroom tour by navigating to our Contact page and selecting 'General Inquiry' or by calling our concierge desk directly. We recommend booking 24 hours in advance for the best experience."
  },
  {
    id: 5,
    question: "How to book an appointment for a test drive?",
    answer: "Test drives can be booked directly from the 'Vehicle Details' page of your chosen car. Simply click the 'Inquire Now' button, or visit our Contact page to schedule a specific date and time."
  },
  {
    id: 6,
    question: "What are the walk-in facilities in the dealership?",
    answer: "Our showroom features a luxury guest lounge with high-speed Wi-Fi, a premium coffee bar, and interactive digital kiosks where you can customize your vehicle specifications while you wait."
  },
  {
    id: 7,
    question: "How to contact the Manager?",
    answer: "For high-priority inquiries or feedback, you can request a direct line to our General Manager via the Contact form by setting the subject to 'Management Inquiry' or by visiting our front desk during business hours."
  }
];

const FAQ = () => {
  const [openIndices, setOpenIndices] = useState([]);

  const toggleAccordion = (index) => {
    setOpenIndices(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        const updated = [...prev, index];
        
        if (updated.length > 3) {
          updated.shift(); 
        }
        return updated;
      }
    });
  };

  return (
    <div className="faq-page">
      <section className="faq-hero">
        <h1>Frequently Asked <span>Questions</span></h1>
        <p>Everything you need to know about our premium services.</p>
      </section>

      <div className="faq-container">
        {FAQ_DATA.map((item, index) => (
          <div 
            key={item.id} 
            className={`faq-item ${openIndices.includes(index) ? 'active' : ''}`}
            onClick={() => toggleAccordion(index)}
          >
            <div className="faq-question">
              <h3>{item.question}</h3>
              <span className="faq-icon">{openIndices.includes(index) ? '−' : '+'}</span>
            </div>
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
