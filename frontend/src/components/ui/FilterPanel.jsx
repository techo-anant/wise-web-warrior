import React from "react";

function FilterPanel({ filters, setFilters }) {

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters({
      ...filters,
      [name]: value
    });
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <h3>Filters</h3>

      <div>
        <label>Min Price: </label>
        <input
          type="number"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Max Price: </label>
        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Max Mileage: </label>
        <input
          type="number"
          name="maxMileage"
          value={filters.maxMileage}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Category: </label>
        <select name="category" value={filters.category} onChange={handleChange}>
          <option value="">All</option>
          <option value="Sedan">Sedan</option>
          <option value="Truck">Truck</option>
          <option value="Sports">Sports</option>
        </select>
      </div>
    </div>
  );
}

export default FilterPanel;