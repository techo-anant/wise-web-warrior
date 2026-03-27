// import React from "react";
// import { NavLink } from "react-router-dom";
// import "./Header.css"; // for styling

// function Header() {
//   return (
//     <header className="site-header">
//       <div className="logo">
//         <h1>Wise Web Warriors</h1>
//       </div>
      
//       <nav className="nav-menu">
//         <ul>
//           <li>
//             <NavLink to="/" end activeclassname="active">Home</NavLink>
//           </li>
//           <li>
//             <NavLink to="/about" activeclassname="active">About</NavLink>
//           </li>
//           <li>
//             <NavLink to="/contact" activeclassname="active">Contact</NavLink>
//           </li>
//           <li>
//             <NavLink to="/faq" activeclassname="active">FAQ</NavLink>
//           </li>
//           <li>
//             <NavLink to="/inventory">Inventory</NavLink>
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// }

// export default Header;

// earlier code above ^^^^^^^^^^^^^^^^^^
//   NEW CODE BELOW


import React from 'react';
import { Link } from 'react-router-dom';
import NavMenu from './NavMenu';
import './Header.css';

function Header({ currentTheme, setTheme, user, onLogout }) {
  
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

  return (
    <header className="main-header">
      <div className="logo-area">
        <h1 className="brand-name">Wise Web <span>Warriors</span></h1>
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
            <div className="user-info" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <Link to="/dashboard" className="nav-link dashboard-link" style={{ fontWeight: '700', color: 'var(--accent-color)', textDecoration: 'none' }}>
                Dashboard
              </Link>
              <span className="welcome-text">
                Hi, <strong>{user.name}</strong> 
                {user.role === 'admin' && <span style={{ fontSize: '0.6rem', marginLeft: '5px', padding: '2px 5px', border: '1px solid var(--accent-color)', borderRadius: '4px', verticalAlign: 'middle' }}>ADMIN</span>}
              </span>
              <button onClick={onLogout} className="login-btn logout-style">
                Logout
              </button>
            </div>
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
