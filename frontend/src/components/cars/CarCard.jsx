import React from "react";
import "./CarCard.css";
import { Link } from "react-router-dom";

function CarCard({ car }) {
  return (
    <Link to={`/cars/${car.id}`} className="car-card-link">
      <div className="car-card">

        <div className="car-image">
          <span>Car Image</span>
        </div>

        <div className="car-info">
          <h3>{car.year} {car.name}</h3>

          <p className="price">${car.price}</p>

          <p>Mileage: {car.mileage} km</p>
          <p>Type: {car.category}</p>
        </div>

      </div>
    </Link>
  );
}

export default CarCard;