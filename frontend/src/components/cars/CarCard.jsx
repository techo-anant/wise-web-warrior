import React from "react";

function CarCard({ car }) {
  return (
    <div className="card">
      <h3>{car.year} {car.name}</h3>
      <p><strong>Price:</strong> ${car.price}</p>
      <p><strong>Mileage:</strong> {car.mileage} km</p>
    </div>
  );
}

// Placeholder for car image - can replace with actual image later
<div className="card">
  <div className="image-placeholder">Car Image</div>
  <h3>{car.year} {car.name}</h3>
  <p><strong>Price:</strong> ${car.price}</p>
  <p><strong>Mileage:</strong> {car.mileage} km</p>
</div>
export default CarCard;