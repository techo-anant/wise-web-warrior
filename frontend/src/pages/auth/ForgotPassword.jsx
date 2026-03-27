import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../dynamic/Auth.css'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset link requested for:", email);
    setSubmitted(true);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {!submitted ? (
          <>
            <h2>Reset <span>Password</span></h2>
            <p className="auth-instruction">
              Enter your email and we'll send you a link to get back into your account.
            </p>
            
            <form className="auth-form" onSubmit={handleSubmit}>
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
              <button type="submit" className="auth-btn">
                Send Reset Link
              </button>
            </form>
          </>
        ) : (
          <div className="auth-success-state">
            <h2>Check Your <span>Inbox</span></h2>
            <p className="success-text">
              If an account exists for <strong>{email}</strong>, you will receive a password reset link shortly.
            </p>
          </div>
        )}
        
        <div className="auth-footer" style={{ marginTop: '20px' }}>
          <p>Suddenly remembered? <Link to="/login">Back to Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
