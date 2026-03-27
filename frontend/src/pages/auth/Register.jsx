import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../dynamic/Auth.css'; 

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    console.log("User Registered:", formData);
    alert("Registration successful! Please login.");
    navigate('/login');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create <span>Account</span></h2>
        <p>Join the Wise Web Warriors community today.</p>
        
        <form className="auth-form" onSubmit={handleRegister}>
          <input 
            type="text" 
            name="username" 
            placeholder="Username" 
            value={formData.username}
            onChange={handleChange} 
            required 
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email Address" 
            value={formData.email}
            onChange={handleChange} 
            required 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password}
            onChange={handleChange} 
            required 
          />
          <input 
            type="password" 
            name="confirmPassword" 
            placeholder="Confirm Password" 
            value={formData.confirmPassword}
            onChange={handleChange} 
            required 
          />
          <button type="submit" className="auth-btn">
            Register
          </button>
        </form>
        
        <div className="auth-footer" style={{ marginTop: '20px' }}>
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
