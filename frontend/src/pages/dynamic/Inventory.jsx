// import React, { useState } from "react";
// import CarGrid from "../../components/cars/CarGrid";
// import SearchBar from "../../components/ui/SearchBar";
// import FilterPanel from "../../components/ui/FilterPanel";
// import { useContext } from "react";
// import { CarContext } from "../../context/CarContext";

// function Inventory() {
//   const { cars } = useContext(CarContext);

//   const [searchTerm, setSearchTerm] = useState("");

//   const [sortOption, setSortOption] = useState("");

//   const [filters, setFilters] = useState({
//     minPrice: "",
//     maxPrice: "",
//     maxMileage: "",
//     category: ""
//   });

//   // Filter cars based on search term and filters
//     let filteredCars = cars.filter((car) => {

//     const matchesSearch =
//       car.name.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesMinPrice =
//       filters.minPrice === "" || car.price >= Number(filters.minPrice);

//     const matchesMaxPrice =
//       filters.maxPrice === "" || car.price <= Number(filters.maxPrice);

//     const matchesMileage =
//       filters.maxMileage === "" || car.mileage <= Number(filters.maxMileage);

//     const matchesCategory =
//       filters.category === "" || car.category === filters.category;
      
//     return (
//       matchesSearch &&
//       matchesMinPrice &&
//       matchesMaxPrice &&
//       matchesMileage &&
//       matchesCategory
//     );
//   });

//   if (sortOption === "priceLow") {
//     filteredCars = [...filteredCars].sort((a, b) => a.price - b.price);
//   }

//   if (sortOption === "priceHigh") {
//     filteredCars = [...filteredCars].sort((a, b) => b.price - a.price);
//   }

//   if (sortOption === "mileageLow") {
//     filteredCars = [...filteredCars].sort((a, b) => a.mileage - b.mileage);
//   }


//   return (
//     <div style={{ padding: "2rem" }}>
//       <h1>Car Inventory</h1>
//       <p>Browse all available vehicles</p>

//       <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

//       <FilterPanel filters={filters} setFilters={setFilters} />

//       <select onChange={(e) => setSortOption(e.target.value)}>
//         <option value="">Sort By</option>
//         <option value="priceLow">Price: Low to High</option>
//         <option value="priceHigh">Price: High to Low</option>
//         <option value="mileageLow">Mileage: Low to High</option>
//       </select>

//       <CarGrid cars={filteredCars} />
//     </div>
//   );
// }

// export default Inventory;




// earlier code above ^^^^^^^^^^^^^^
//   NEW CODE BELOW


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import SearchBar from '../../components/ui/SearchBar';
import './Inventory.css';

const CAR_DATA = [
  { id: 1, model: "Sleek Sedan", price: 35000, category: "sedan", make: "Toyota", condition: "Brand New", year: 2024, mileage: 0, image_url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800" },
  { id: 2, model: "Mountain Crusher SUV", price: 52000, category: "suv", make: "Ford", condition: "Used", year: 2022, mileage: 1200, image_url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800" },
  { id: 3, model: "Night Rider Coupe", price: 89000, category: "coupe", make: "Porsche", condition: "Brand New", year: 2024, mileage: 0, image_url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800" },
  { id: 4, model: "Workhorse 1500", price: 44500, category: "truck", make: "RAM", condition: "Used", year: 2021, mileage: 1800, image_url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=800" }
];

function Inventory() {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    types: [], 
    conditions: [],
    priceRange: { min: 8000, max: 700000 },
    yearRange: { min: 2000, max: nextYear },
    kmsRange: { min: 0, max: 2000 }
  });

  const getSelectionStyles = (min, max, rangeMax, rangeMin = 0) => {
    const left = ((min - rangeMin) / (rangeMax - rangeMin)) * 100;
    const right = 100 - ((max - rangeMin) / (rangeMax - rangeMin)) * 100;
    return { left: `${left}%`, right: `${right}%` };
  };

  const handleCheckbox = (category, value) => {
    const updated = filters[category].includes(value)
      ? filters[category].filter(item => item !== value)
      : [...filters[category], value];
    setFilters({ ...filters, [category]: updated });
  };

  const filteredCars = CAR_DATA.filter(car => {
    const search = searchTerm.toLowerCase();
    
    const matchesSearch = 
      car.model.toLowerCase().includes(search) || 
      car.make.toLowerCase().includes(search) ||
      car.year.toString().includes(search);
    
    const matchesType = filters.types.length === 0 || filters.types.includes(car.category);
    const matchesCondition = filters.conditions.length === 0 || filters.conditions.includes(car.condition);
    const matchesPrice = car.price >= filters.priceRange.min && car.price <= filters.priceRange.max;
    const matchesYear = car.year >= filters.yearRange.min && car.year <= filters.yearRange.max;
    const matchesKms = car.mileage >= filters.kmsRange.min && car.mileage <= filters.kmsRange.max;

    return matchesSearch && matchesType && matchesCondition && matchesPrice && matchesYear && matchesKms;
  });

  return (
    <div className="inventory-page">
      <div className="inventory-layout">
        <Sidebar 
          filters={filters} 
          setFilters={setFilters} 
          handleCheckbox={handleCheckbox} 
          getSelectionStyles={getSelectionStyles}
          nextYear={nextYear}
        />

        <div className="inventory-main">
          <header className="inventory-header">
            <h1>Our <span>Showroom</span></h1>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          <div className="inventory-grid">
            {filteredCars.map(car => (
              <div key={car.id} className="car-card">
                <div className="car-image" style={{ backgroundImage: `url(${car.image_url})` }}>
                  <span className="car-tag">{car.condition}</span>
                </div>
                <div className="car-info">
                  <span className="car-type-label">{car.category}</span>
                  <h3>{car.year} {car.make} {car.model}</h3>
                  <p className="price">${Number(car.price).toLocaleString()}</p>
                  
                  <div className="card-actions">
                    <Link to={`/inventory/${car.id}`} className="view-details-btn">View Details</Link>
                    <Link to={`/compare?id=${car.id}`} className="compare-btn-small">Compare</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCars.length === 0 && (
            <div className="no-results">
              <h3>No match for your filters</h3>
              <p>Try adjusting your search or filter settings.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Inventory;
