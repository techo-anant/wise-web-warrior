// import React from "react";
// import { Link } from "react-router-dom";

// function NavMenu() {
//   return (
//     <nav>
//       <Link to="/">Home</Link> | 
//       <Link to="/about">About</Link> | 
//       <Link to="/contact">Contact</Link> | 
//       <Link to="/faq">FAQ</Link>
//     </nav>
//   );
// }

// export default NavMenu;


// earlier code above ^^^^^^^^^^^^^
//   NEW CODE BELOW




import React from 'react';
import { Link } from 'react-router-dom';

function NavMenu() {
  return (
    <nav className="navigation">
      <ul className="nav-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/inventory">Inventory</Link></li>
        <li><Link to="/compare">Compare</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
        <li><Link to="/dealer-locator">Find Dealership</Link></li>
      </ul>
    </nav>
  );
}

export default NavMenu;
