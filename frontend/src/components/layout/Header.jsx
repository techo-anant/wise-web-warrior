import React from 'react';
import { Link } from 'react-router-dom';
import NavMenu from './NavMenu';
import './Header.css';

function Header({ currentTheme, setTheme, user }) {
  
  const cycleTheme = () => {
    if (currentTheme === 'default') {
      setTheme('dark');
    } else if (currentTheme === 'dark') {
      setTheme('sport');
    } else {
      setTheme('default');
    }
  };

  const renderThemeIcon = () => {
    if (currentTheme === 'default') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
      );
    }
    if (currentTheme === 'dark') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
      );
    }
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 13 4 0 0 8 8-12-4 0 0-7Z"/></svg>
    );
  };

  const renderProfileIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );

  return (
    <header className="main-header">
      <div className="logo-area">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1 className="brand-name">
            Sharp <span className="hide-on-mobile">Car Deals</span>
          </h1>
        </Link>
      </div>

      <NavMenu />

      <div className="header-utilities">
        <button 
          className={`theme-toggle-btn theme-${currentTheme}`} 
          onClick={cycleTheme}
          title={`Current Theme: ${currentTheme}`}
        >
          {renderThemeIcon()}
        </button>

        <div className="auth-section">
          {user ? (
            <Link 
              to="/profile" 
              className="user-profile-trigger"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                textDecoration: 'none',
                color: 'inherit',
                padding: '5px 12px',
                borderRadius: '25px',
                border: '1px solid rgba(128,128,128,0.2)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', color: 'var(--accent-color)' }}>
                {renderProfileIcon()}
              </div>

              {/* Added 'hide-on-mobile' class to the welcome text */}
              <span className="welcome-text hide-on-mobile" style={{ fontSize: '0.9rem', fontWeight: '500' }}>
                Hi, <strong>{user.name}</strong>
                {user.role === 'admin' && (
                  <span className="admin-badge-small">Admin</span>
                )}
              </span>
            </Link>
          ) : (
            <Link to="/login" className="login-btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;