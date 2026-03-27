import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CarContext } from "../../context/CarContext";
import CarCard from "../../components/cars/CarCard";

function Category() {
  const { category } = useParams();
  const { cars } = useContext(CarContext);

  const filtered = cars.filter(
    (car) => car.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div>
      <h2>{category} Cars</h2>

      {filtered.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}

export default Category;