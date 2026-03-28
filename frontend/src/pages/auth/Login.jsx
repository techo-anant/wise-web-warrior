import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../services/authService';
import '../dynamic/Auth.css';

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login(formData.email, formData.password);

      // Set user in parent state
      setUser(data.user);

      navigate('/');
      
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome <span>Back</span></h2>
        <p>Login to access your premium showroom profile.</p>

        {error && (
          <div style={{ color: 'red', marginBottom: '10px', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

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

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
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