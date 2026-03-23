import React, { useState } from "react";
import CarGrid from "../../components/cars/CarGrid";
import SearchBar from "../../components/ui/SearchBar";

function Home() {
  // Fake car data (can connect to backend later)
  const [cars] = useState([
  { id: 1, name: "Toyota Camry", price: 25000, year: 2020, mileage: 50000 },
  { id: 2, name: "Honda Civic", price: 22000, year: 2019, mileage: 60000 },
  { id: 3, name: "Ford Mustang", price: 40000, year: 2022, mileage: 15000 },
]);

  const [search, setSearch] = useState("");

  // Filter cars by search
  const filteredCars = cars.filter(car =>
    car.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Available Cars</h2>

      {/* Search bar */}
      <SearchBar setSearch={setSearch} />

      {/* Car list */}
      <CarGrid cars={filteredCars} />
    </div>
  );
}

export default Home;