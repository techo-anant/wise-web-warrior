import React, { useState } from "react";
import CarGrid from "../../components/cars/CarGrid";
import SearchBar from "../../components/ui/SearchBar";
import FilterPanel from "../../components/ui/FilterPanel";
import { useContext } from "react";
import { CarContext } from "../../context/CarContext";

function Inventory() {
  const { cars } = useContext(CarContext);

  const [searchTerm, setSearchTerm] = useState("");

  const [sortOption, setSortOption] = useState("");

  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    maxMileage: "",
    category: ""
  });

  // Filter cars based on search term and filters
    let filteredCars = cars.filter((car) => {

    const matchesSearch =
      car.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesMinPrice =
      filters.minPrice === "" || car.price >= Number(filters.minPrice);

    const matchesMaxPrice =
      filters.maxPrice === "" || car.price <= Number(filters.maxPrice);

    const matchesMileage =
      filters.maxMileage === "" || car.mileage <= Number(filters.maxMileage);

    const matchesCategory =
      filters.category === "" || car.category === filters.category;
      
    return (
      matchesSearch &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesMileage &&
      matchesCategory
    );
  });

  if (sortOption === "priceLow") {
    filteredCars = [...filteredCars].sort((a, b) => a.price - b.price);
  }

  if (sortOption === "priceHigh") {
    filteredCars = [...filteredCars].sort((a, b) => b.price - a.price);
  }

  if (sortOption === "mileageLow") {
    filteredCars = [...filteredCars].sort((a, b) => a.mileage - b.mileage);
  }


  return (
    <div style={{ padding: "2rem" }}>
      <h1>Car Inventory</h1>
      <p>Browse all available vehicles</p>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <FilterPanel filters={filters} setFilters={setFilters} />

      <select onChange={(e) => setSortOption(e.target.value)}>
        <option value="">Sort By</option>
        <option value="priceLow">Price: Low to High</option>
        <option value="priceHigh">Price: High to Low</option>
        <option value="mileageLow">Mileage: Low to High</option>
      </select>

      <CarGrid cars={filteredCars} />
    </div>
  );
}

export default Inventory;