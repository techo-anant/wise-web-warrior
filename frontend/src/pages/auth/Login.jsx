import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../dynamic/Auth.css'; 

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
  
    const mockUser = {
      name: formData.email.split('@')[0], 
      role: formData.email.toLowerCase().includes('admin') ? 'admin' : 'user',
      token: "mock-jwt-token"
    };

    localStorage.setItem('user', JSON.stringify(mockUser));
    
    setUser(mockUser);

    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome <span>Back</span></h2>
        <p>Login to access your premium showroom profile.</p>
        
        <form className="auth-form" onSubmit={handleLogin}>
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

          <div className="forgot-pw-container" style={{ textAlign: 'right', marginBottom: '15px' }}>
            <Link to="/forgot-password" style={{ 
                fontSize: '0.85rem', 
                color: 'var(--accent-color)', 
                textDecoration: 'none',
                fontWeight: '600',
                opacity: '0.9'
              }}>
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>
        
        <div className="auth-footer" style={{ marginTop: '20px' }}>
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
