import React from "react";
import "./Home.css";
import CarGrid from "../../components/cars/CarGrid";
import { useContext } from "react";
import { CarContext } from "../../context/CarContext";

function Home() {

const { cars } = useContext(CarContext);
const featuredCars = cars.slice(0, 3);

  return (
    <div className="home">

      {/* HERO SECTION */}
      <section className="hero">
        <h1>Find Your Perfect Car</h1>
        <p>Browse the best deals on new and used vehicles.</p>
        <button className="hero-btn">Brownse Inventory</button>
      </section>

      {/* FEATURED CARS */}
      <section className="featured">
        <h2>Featured Cars</h2>

        <CarGrid cars={featuredCars} />
      </section>

    </div>
  );
}

export default Home;