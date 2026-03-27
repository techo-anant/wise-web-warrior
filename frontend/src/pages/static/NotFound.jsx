import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1>4<span>0</span>4</h1>
        <h2>Page <span>Not Found</span></h2>
        <p>
          It looks like the page you're looking for has taken a detour or is 
          currently under maintenance in our garage.
        </p>
        <Link to="/" className="home-btn">
          Back to Showroom
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
