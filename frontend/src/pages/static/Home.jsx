// import React from "react";
// import "./Home.css";
// import CarGrid from "../../components/cars/CarGrid";
// import { useContext } from "react";
// import { CarContext } from "../../context/CarContext";

// function Home() {

// const { cars } = useContext(CarContext);
// const featuredCars = cars.slice(0, 3);

//   return (
//     <div className="home">

//       {/* HERO SECTION */}
//       <section className="hero">
//         <h1>Find Your Perfect Car</h1>
//         <p>Browse the best deals on new and used vehicles.</p>
//         <button className="hero-btn">Brownse Inventory</button>
//       </section>

//       {/* FEATURED CARS */}
//       <section className="featured">
//         <h2>Featured Cars</h2>

//         <CarGrid cars={featuredCars} />
//       </section>

//     </div>
//   );
// }

// export default Home;

// earlier code above ^^^^^^^^^^^
//   NEW CODE BELOW


import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
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
            <button className="btn-secondary">Book a Test Drive</button>
          </div>
        </div>
      </section>

      <section className="featured-types">
        <h2>Browse by Type</h2>
        <div className="type-grid">
          <div className="type-card">SUVs</div>
          <div className="type-card">Sedans</div>
          <div className="type-card">Trucks</div>
          <div className="type-card">Luxury</div>
        </div>
      </section>
    </div>
  );
}

export default Home;
