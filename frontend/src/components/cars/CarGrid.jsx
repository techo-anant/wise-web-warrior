import React from "react";
import CarCard from "./CarCard";

function CarGrid({ cars }) {
  return (
    <div className="car-container">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}

export default CarGrid;