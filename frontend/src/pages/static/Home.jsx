import React from "react";
import "./Home.css";
import CarGrid from "../../components/cars/CarGrid";

function Home() {

  const cars = [
    { name: "Honda Civic", year: 2022, price: 24000, mileage: 15000 },
    { name: "Toyota Corolla", year: 2021, price: 22500, mileage: 20000 },
    { name: "Ford Mustang", year: 2023, price: 35000, mileage: 5000 }
  ];

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

        <CarGrid cars={cars} />

        </section>

    </div>
  );
}

export default Home;