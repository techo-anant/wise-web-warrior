import React, { useState } from "react";
import CarGrid from "../../components/cars/CarGrid";
import SearchBar from "../../components/ui/SearchBar";

function Home() {
  // Fake car data (can connect to backend later)
  const [cars] = useState([
    { id: 1, name: "Toyota Camry", price: 25000 },
    { id: 2, name: "Honda Civic", price: 22000 },
    { id: 3, name: "Ford Mustang", price: 40000 },
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