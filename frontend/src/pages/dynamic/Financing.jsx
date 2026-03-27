import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Financing.css';

const Financing = () => {
  const location = useLocation();

  const initialPrice = location.state?.price || 45000;
  const carName = location.state ? `${location.state.make} ${location.state.model}` : "Selected Vehicle";

  const [carPrice, setCarPrice] = useState(initialPrice);
  const [downPayment, setDownPayment] = useState(Math.floor(initialPrice * 0.1));
  const [term, setTerm] = useState(60); 
  const [interestRate, setInterestRate] = useState(5.9); 
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    const fetchDatabaseRates = async () => {
      try {
        const mockDbRate = 4.99; 
        setInterestRate(mockDbRate);
      } catch (err) {
        console.log("Using fallback interest rate.");
      }
    };
    fetchDatabaseRates();
  }, []);

  useEffect(() => {
    const principal = carPrice - downPayment;
    const monthlyRate = (interestRate / 100) / 12;
    const numberOfPayments = term;

    if (principal <= 0) {
        setMonthlyPayment(0);
        return;
    }

    if (monthlyRate === 0) {
      setMonthlyPayment((principal / numberOfPayments).toFixed(2));
    } else {
      const x = Math.pow(1 + monthlyRate, numberOfPayments);
      const monthly = (principal * x * monthlyRate) / (x - 1);
      setMonthlyPayment(monthly.toFixed(2));
    }
  }, [carPrice, downPayment, term, interestRate]);

  return (
    <div className="finance-page">
      <div className="finance-container">
        <div className="calc-section">
          <h2>Estimate <span>Your Payment</span></h2>
          <p className="calculating-for">Calculating for: <strong>{carName}</strong></p>
          
          <div className="input-group">
            <label>Vehicle Price ($)</label>
            <input 
              type="number" 
              value={carPrice} 
              onChange={(e) => setCarPrice(Number(e.target.value))} 
            />
          </div>

          <div className="input-group">
            <label>Down Payment ($)</label>
            <input 
              type="range" 
              min="0" 
              max={carPrice} 
              step="500"
              value={downPayment} 
              onChange={(e) => setDownPayment(Number(e.target.value))} 
            />
            <div className="range-val">${downPayment.toLocaleString()}</div>
          </div>

          <div className="input-group">
            <label>Loan Term (Months)</label>
            <select value={term} onChange={(e) => setTerm(Number(e.target.value))}>
              <option value="36">36 Months (3 Years)</option>
              <option value="48">48 Months (4 Years)</option>
              <option value="60">60 Months (5 Years)</option>
              <option value="72">72 Months (6 Years)</option>
              <option value="84">84 Months (7 Years)</option>
            </select>
          </div>
          
          <div className="interest-notice">
            <p>Current Market Rate: <strong>{interestRate}% APR</strong></p>
          </div>
        </div>

        <div className="result-section">
          <div className="result-card">
            <h4>Estimated Monthly Payment</h4>
            <div className="payment-amount">${Number(monthlyPayment).toLocaleString()}</div>
            <p className="disclaimer">Excludes taxes, titles, and registration fees.</p>
            <button className="apply-btn" onClick={() => alert("Redirecting to Credit Application...")}>
              Apply For Financing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Financing;
