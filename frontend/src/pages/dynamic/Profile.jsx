// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Auth.css';
//
// const Profile = ({ user, setUser, onLogout }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const navigate = useNavigate();
//
//   const [profileData, setProfileData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     address: ''
//   });
//
//   useEffect(() => {
//     if (user) {
//       setProfileData({
//         fullName: user.name || '',
//         email: user.email || '',
//         phone: user.phone || '+1 (555) 000-0000',
//         address: user.address || '123 Warrior Lane, Tech City'
//       });
//     }
//   }, [user]);
//
//   const handleChange = (e) => {
//     setProfileData({ ...profileData, [e.target.name]: e.target.value });
//   };
//
//   const handleSave = () => {
//     const updatedUser = {
//       ...user,
//       name: profileData.fullName,
//       email: profileData.email,
//       phone: profileData.phone,
//       address: profileData.address
//     };
//
//     setUser(updatedUser);
//     localStorage.setItem('user', JSON.stringify(updatedUser));
//     setIsEditing(false);
//     alert("Profile updated successfully!");
//   };
//
//   const handleLogoutClick = () => {
//     onLogout();
//     navigate('/');
//   };
//
//   return (
//     <div className="auth-page" style={{ padding: '120px 20px' }}>
//       <div className="auth-card" style={{ maxWidth: '700px', width: '100%' }}>
//
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
//            <Link to="/dashboard" style={{ color: 'var(--accent-color)', textDecoration: 'none', fontWeight: 'bold' }}>
//              ← Back to Dashboard
//            </Link>
//         </div>
//
//         <h2>User <span>Profile</span></h2>
//         <p style={{ marginBottom: '20px', opacity: 0.8 }}>
//             {isEditing ? "Update your details below." : "View your account information."}
//         </p>
//
//         {/* Form is now just a container for inputs */}
//         <div className="auth-form">
//           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
//
//             <div className="input-group">
//               <label style={{ color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: 'bold' }}>Full Name</label>
//               <input
//                 type="text"
//                 name="fullName"
//                 value={profileData.fullName}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//                 className={!isEditing ? 'disabled-input' : ''}
//               />
//             </div>
//
//             <div className="input-group">
//               <label style={{ color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: 'bold' }}>Email Address</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={profileData.email}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//                 className={!isEditing ? 'disabled-input' : ''}
//               />
//             </div>
//
//             <div className="input-group">
//               <label style={{ color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: 'bold' }}>Phone</label>
//               <input
//                 type="text"
//                 name="phone"
//                 value={profileData.phone}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//                 className={!isEditing ? 'disabled-input' : ''}
//               />
//             </div>
//
//             <div className="input-group">
//               <label style={{ color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: 'bold' }}>Address</label>
//               <input
//                 type="text"
//                 name="address"
//                 value={profileData.address}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//                 className={!isEditing ? 'disabled-input' : ''}
//               />
//             </div>
//           </div>
//
//           {/* Buttons are OUTSIDE a formal <form onSubmit> to prevent auto-triggering */}
//           <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
//             {isEditing ? (
//               <>
//                 <button
//                   className="auth-btn"
//                   onClick={handleSave}
//                 >
//                   Save Changes
//                 </button>
//                 <button
//                   className="auth-btn"
//                   style={{ background: 'transparent', border: '1px solid #ff4d4d', color: '#ff4d4d' }}
//                   onClick={() => setIsEditing(false)}
//                 >
//                   Cancel
//                 </button>
//               </>
//             ) : (
//               <>
//                 <button
//                   className="auth-btn"
//                   onClick={() => setIsEditing(true)}
//                 >
//                   Edit Profile
//                 </button>
//                 <button
//                   className="auth-btn"
//                   onClick={handleLogoutClick}
//                   style={{ background: 'transparent', border: '1px solid var(--accent-color)', color: 'var(--accent-color)' }}
//                 >
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default Profile;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, updateProfile } from '../../services/userService';
import './Auth.css';

const Profile = ({ user, setUser, onLogout }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    // Load real profile from backend on mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                setProfileData({
                    name:    data.name  || '',
                    email:   data.email || '',
                    phone:   user?.phone   || '+1 (555) 000-0000',
                    address: user?.address || '123 Warrior Lane, Tech City',
                });
            } catch (err) {
                setError('Failed to load profile.');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    // Save name and email to backend
    const handleSave = async () => {
        setSaving(true);
        setError('');
        setSuccess('');

        try {
            await updateProfile({ name: profileData.name, email: profileData.email });

            // Update user in localStorage and parent state
            const updatedUser = { ...user, name: profileData.name, email: profileData.email };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);

            setSuccess('Profile updated successfully.');
            setIsEditing(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile.');
        } finally {
            setSaving(false);
        }
    };

    // Logout and redirect to home
    const handleLogout = () => {
        if (onLogout) onLogout();
        navigate('/');
    };

    if (loading) return <div className="auth-page"><p>Loading profile...</p></div>;

    return (
        <div className="auth-page" style={{ padding: '120px 20px' }}>
            <div className="auth-card" style={{ maxWidth: '700px', width: '100%' }}>

                {/* ── TOP NAV ── */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <button
                        onClick={() => navigate('/dashboard')}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--accent-color)',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontSize: '0.95rem',
                            padding: 0,
                        }}
                    >
                        Dashboard →
                    </button>
                </div>

                <h2>User <span>Profile</span></h2>
                <p style={{ marginBottom: '20px', opacity: 0.8 }}>
                    {isEditing ? 'Update your details below.' : 'View your account information.'}
                </p>

                {/* Messages */}
                {error   && <p style={{ color: 'red',   marginBottom: '10px', fontSize: '0.9rem' }}>{error}</p>}
                {success && <p style={{ color: 'green', marginBottom: '10px', fontSize: '0.9rem' }}>{success}</p>}

                {/* ── PROFILE FORM ── */}
                <div className="auth-form">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

                        {/* Full Name */}
                        <div className="input-group">
                            <label style={{ color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={profileData.name}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={!isEditing ? 'disabled-input' : ''}
                            />
                        </div>

                        {/* Email */}
                        <div className="input-group">
                            <label style={{ color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={profileData.email}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={!isEditing ? 'disabled-input' : ''}
                            />
                        </div>

                        {/* Phone */}
                        <div className="input-group">
                            <label style={{ color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                Phone
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={profileData.phone}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={!isEditing ? 'disabled-input' : ''}
                            />
                        </div>

                        {/* Address */}
                        <div className="input-group">
                            <label style={{ color: 'var(--accent-color)', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                Address
                            </label>
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

                    {/* Role badge — not editable */}
                    <div style={{
                        marginTop: '20px',
                        background: 'rgba(var(--accent-rgb), 0.1)',
                        padding: '10px 15px',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                    }}>
                        Role: <strong style={{ color: 'var(--accent-color)' }}>
                        {user?.role === 'admin' ? 'Admin' : 'Member'}
                    </strong>
                    </div>

                    {/* ── ACTION BUTTONS ── */}
                    <div style={{ marginTop: '30px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                        {isEditing ? (
                            <>
                                {/* Save changes */}
                                <button
                                    className="auth-btn"
                                    onClick={handleSave}
                                    disabled={saving}
                                >
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </button>

                                {/* Cancel editing */}
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
                                {/* Enter edit mode */}
                                <button
                                    className="auth-btn"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit Profile
                                </button>

                                {/* Logout */}
                                <button
                                    className="auth-btn"
                                    onClick={handleLogout}
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