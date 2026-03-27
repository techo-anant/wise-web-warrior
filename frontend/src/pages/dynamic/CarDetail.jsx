import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CarContext } from "../../context/CarContext";
import "./CarDetail.css";

function CarDetail() {
  const { id } = useParams();
  const { cars } = useContext(CarContext);

  const car = cars.find((c) => c.id === parseInt(id));

  if (!car) {
    return <h2>Car not found</h2>;
  }

  return (
    <div>
      <h2>{car.year} {car.name}</h2>
      <p>Price: ${car.price}</p>
      <p>Mileage: {car.mileage} km</p>
      <p>Type: {car.category}</p>
    </div>
  );
}

export default CarDetail;