import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css'; 

const Profile = ({ user, setUser, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        fullName: user.name || '',
        email: user.email || '',
        phone: user.phone || '+1 (555) 000-0000',
        address: user.address || '123 Warrior Lane, Tech City'
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updatedUser = { 
      ...user, 
      name: profileData.fullName,
      email: profileData.email,
      phone: profileData.phone,
      address: profileData.address
    };

    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleLogoutClick = () => {
    onLogout(); 
    navigate('/'); 
  };

  return (
    <div className="auth-page" style={{ padding: '120px 20px' }}>
      <div className="auth-card" style={{ maxWidth: '700px', width: '100%' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
           <Link to="/dashboard" style={{ color: 'var(--accent-color)', textDecoration: 'none', fontWeight: 'bold' }}>
             ← Back to Dashboard
           </Link>
        </div>

        <h2>User <span>Profile</span></h2>
        <p style={{ marginBottom: '20px', opacity: 0.8 }}>
            {isEditing ? "Update your details below." : "View your account information."}
        </p>
        
        {/* Form is now just a container for inputs */}
        <div className="auth-form">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            
            <div className="input-group">
              <label style={{ color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: 'bold' }}>Full Name</label>
              <input 
                type="text" 
                name="fullName" 
                value={profileData.fullName} 
                onChange={handleChange} 
                disabled={!isEditing}
                className={!isEditing ? 'disabled-input' : ''}
              />
            </div>

            <div className="input-group">
              <label style={{ color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: 'bold' }}>Email Address</label>
              <input 
                type="email" 
                name="email"
                value={profileData.email} 
                onChange={handleChange}
                disabled={!isEditing} 
                className={!isEditing ? 'disabled-input' : ''}
              />
            </div>

            <div className="input-group">
              <label style={{ color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: 'bold' }}>Phone</label>
              <input 
                type="text" 
                name="phone"
                value={profileData.phone} 
                onChange={handleChange}
                disabled={!isEditing} 
                className={!isEditing ? 'disabled-input' : ''}
              />
            </div>

            <div className="input-group">
              <label style={{ color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: 'bold' }}>Address</label>
              <input 
                type="text" 
                name="address"
                value={profileData.address} 
                onChange={handleChange}
                disabled={!isEditing} 
                className={!isEditing ? 'disabled-input' : ''}
              />
            </div>
          </div>

          {/* Buttons are OUTSIDE a formal <form onSubmit> to prevent auto-triggering */}
          <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
            {isEditing ? (
              <>
                <button 
                  className="auth-btn" 
                  onClick={handleSave}
                >
                  Save Changes
                </button>
                <button 
                  className="auth-btn" 
                  style={{ background: 'transparent', border: '1px solid #ff4d4d', color: '#ff4d4d' }}
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button 
                  className="auth-btn" 
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
                <button 
                  className="auth-btn" 
                  onClick={handleLogoutClick}
                  style={{ background: 'transparent', border: '1px solid var(--accent-color)', color: 'var(--accent-color)' }}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;