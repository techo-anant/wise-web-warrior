import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home">

      {/* HERO SECTION */}
      <section className="hero">
        <h1>Find Your Perfect Car</h1>
        <p>Browse the best deals on new and used vehicles.</p>
        <button className="hero-btn">Browse Inventory</button>
      </section>

      {/* FEATURED CARS */}
      <section className="featured">
        <h2>Featured Cars</h2>

        <div className="car-list">
          <div className="car-card">
            <h3>2022 Honda Civic</h3>
            <p>Price: $24,000</p>
          </div>

          <div className="car-card">
            <h3>2021 Toyota Corolla</h3>
            <p>Price: $22,500</p>
          </div>

          <div className="car-card">
            <h3>2023 Ford Mustang</h3>
            <p>Price: $35,000</p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;