import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css"; // for styling

function Header() {
  return (
    <header className="site-header">
      <div className="logo">
        <h1>Wise Web Warriors</h1>
      </div>
      
      <nav className="nav-menu">
        <ul>
          <li>
            <NavLink to="/" end activeclassname="active">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about" activeclassname="active">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact" activeclassname="active">Contact</NavLink>
          </li>
          <li>
            <NavLink to="/faq" activeclassname="active">FAQ</NavLink>
          </li>
          <li>
            <NavLink to="/inventory">Inventory</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;