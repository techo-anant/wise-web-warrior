import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function NavMenu() {
  const [visibleCount, setVisibleCount] = useState(7);
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const dropdownRef = useRef(null);
  
  const allLinks = [
    { to: "/", label: "Home" },
    { to: "/inventory", label: "Inventory" },
    { to: "/compare", label: "Compare" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact" },
    { to: "/faq", label: "FAQ" },
    { to: "/dealer-locator", label: "Find Dealership" },
  ];

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      // Aggressive thresholds for small devices like Galaxy Z Fold 5
      if (width < 550) {
        setVisibleCount(0); // Moves everything to the dropdown
      } else if (width < 750) {
        setVisibleCount(1);
      } else if (width < 900) {
        setVisibleCount(2);
      } else if (width < 1050) {
        setVisibleCount(4);
      } else if (width < 1200) {
        setVisibleCount(5);
      } else {
        setVisibleCount(7);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Closes menu when clicking outside the dropdown area
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const visibleItems = allLinks.slice(0, visibleCount);
  const hiddenItems = allLinks.slice(visibleCount);

  return (
    <nav className="navigation" ref={navRef}>
      <ul className="nav-list">
        
        {visibleItems.map((link, index) => (
          <li key={index}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}

        {hiddenItems.length > 0 && (
          <li className="nav-dropdown" ref={dropdownRef}>
            <button 
              type="button"
              className={`more-btn ${isOpen ? 'active' : ''}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
            >
              {isOpen ? (
                /* Close Icon (X) */
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
              ) : (
                /* Hamburger Icon */
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" />
                </svg>
              )}
            </button>

            {/* The list is now persistently rendered based on the isOpen state */}
            <ul className={`dropdown-content ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
              {hiddenItems.map((link, index) => (
                <li key={index}>
                  <Link to={link.to} onClick={() => setIsOpen(false)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavMenu;