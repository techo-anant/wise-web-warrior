import React from "react";

function CarCard({ car }) {
  return (
    <div className="card">
      <h3>{car.name}</h3>
      <p>Price: ${car.price}</p>
    </div>
  );
}

export default CarCard;