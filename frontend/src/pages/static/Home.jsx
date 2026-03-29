import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const navigate = useNavigate();

    // Navigate to category page directly instead of inventory with query param
    const handleTypeClick = (type) => {
        navigate(`/inventory?type=${type}`);
    };

    const carTypes = [
        { label: 'SUVs',     value: 'suv' },
        { label: 'Sedans',   value: 'sedan' },
        { label: 'Trucks',   value: 'truck' },
        { label: 'Electric', value: 'electric' },
    ];

    return (
        <div className="home-container">
            <section className="hero">
                <div className="hero-content">
                    <h1>Find Your Perfect <span>Drive</span></h1>
                    <p>Explore our exclusive collection of premium vehicles tailored for the Wise Web Warrior.</p>
                    <div className="hero-btns">
                        <Link to="/inventory" className="btn-primary">
                            View Inventory
                        </Link>
                        <Link to="/inventory" className="btn-secondary">
                            Book a Test Drive
                        </Link>
                    </div>
                </div>
            </section>

            <section className="featured-types">
                <h2>Browse by Type</h2>
                <div className="type-grid">
                    {carTypes.map((type) => (
                        <div
                            key={type.value}
                            className="type-card"
                            onClick={() => handleTypeClick(type.value)}
                        >
                            {type.label}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Home;