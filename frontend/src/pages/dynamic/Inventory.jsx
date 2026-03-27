import React, { useState } from "react";
import CarGrid from "../../components/cars/CarGrid";
import SearchBar from "../../components/ui/SearchBar";
import FilterPanel from "../../components/ui/FilterPanel";

function Inventory() {

  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    maxMileage: "",
    category: ""
  });

  const cars = [
    { name: "Honda Civic", year: 2022, price: 24000, mileage: 15000, category: "Sedan" },
    { name: "Toyota Corolla", year: 2021, price: 22500, mileage: 20000, category: "Sedan" },
    { name: "Ford Mustang", year: 2023, price: 35000, mileage: 5000, category: "Sports" },
    { name: "BMW 3 Series", year: 2020, price: 28000, mileage: 30000, category: "Sedan" },
    { name: "Audi A4", year: 2019, price: 27000, mileage: 40000, category: "Sedan" },
    { name: "Chevy Silverado", year: 2021, price: 42000, mileage: 25000, category: "Truck" }
  ];

  // Filter cars based on search term and filters
  const filteredCars = cars.filter((car) => {

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

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Car Inventory</h1>
      <p>Browse all available vehicles</p>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <FilterPanel filters={filters} setFilters={setFilters} />

      <CarGrid cars={filteredCars} />
    </div>
  );
}

export default Inventory;