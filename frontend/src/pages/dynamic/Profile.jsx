import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../../services/userService';
import '../dynamic/Auth.css';

const Profile = ({ user, setUser }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load profile from backend on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setFormData({ name: data.name, email: data.email });
      } catch (err) {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      await updateProfile(formData);
      // Update user in localStorage and parent state
      const updatedUser = { ...user, name: formData.name, email: formData.email };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setSuccess('Profile updated successfully.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="auth-page"><p>Loading profile...</p></div>;

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: '500px' }}>
        <h2>My <span>Profile</span></h2>
        <p>Update your personal information below.</p>

        {error && (
          <div style={{ color: 'red', marginBottom: '10px', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{ color: 'green', marginBottom: '10px', fontSize: '0.9rem' }}>
            {success}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSave}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
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

          {/* Role badge - not editable */}
          <div style={{
            background: 'rgba(var(--accent-rgb), 0.1)',
            padding: '10px 15px',
            borderRadius: '8px',
            marginBottom: '15px',
            fontSize: '0.9rem',
          }}>
            Role: <strong style={{ color: 'var(--accent-color)' }}>
              {user?.role === 'admin' ? 'Admin' : 'Member'}
            </strong>
          </div>

          <button type="submit" className="auth-btn" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;