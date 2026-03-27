import React from 'react';

function Sidebar({ filters, setFilters, handleCheckbox, getSelectionStyles, nextYear }) {
  return (
    <aside className="filter-sidebar">
      <h3>Filter <span>Selection</span></h3>
      
      <div className="filter-group">
        <h4>Condition</h4>
        <div className="checkbox-list">
          <label>
            <input 
              type="checkbox" 
              checked={filters.conditions.includes('Brand New')}
              onChange={() => handleCheckbox('conditions', 'Brand New')} 
            /> Brand New
          </label>
          <label>
            <input 
              type="checkbox" 
              checked={filters.conditions.includes('Used')}
              onChange={() => handleCheckbox('conditions', 'Used')} 
            /> Used
          </label>
        </div>
      </div>

      <div className="filter-group">
        <h4>Body Type</h4>
        <div className="checkbox-list">
          {[
            { label: 'Sedan', val: 'sedan' },
            { label: 'SUV', val: 'suv' },
            { label: 'Truck', val: 'truck' },
            { label: 'Coupe', val: 'coupe' },
            { label: 'Electric', val: 'electric' },
            { label: 'Van', val: 'van' }
          ].map(type => (
            <label key={type.val}>
              <input 
                type="checkbox" 
                checked={filters.types.includes(type.val)}
                onChange={() => handleCheckbox('types', type.val)} 
              /> 
              {type.label}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Price: ${filters.priceRange.min.toLocaleString()} - ${filters.priceRange.max.toLocaleString()}</h4>
        <div className="slider-container">
          <input type="range" min="8000" max="700000" step="1000" className="thumb thumb-left" value={filters.priceRange.min}
            onChange={(e) => setFilters({...filters, priceRange: {...filters.priceRange, min: Math.min(Number(e.target.value), filters.priceRange.max - 5000)}})} />
          <input type="range" min="8000" max="700000" step="1000" className="thumb thumb-right" value={filters.priceRange.max}
            onChange={(e) => setFilters({...filters, priceRange: {...filters.priceRange, max: Math.max(Number(e.target.value), filters.priceRange.min + 5000)}})} />
          <div className="slider-track"></div>
          <div className="slider-range-highlight" style={getSelectionStyles(filters.priceRange.min, filters.priceRange.max, 700000, 8000)}></div>
        </div>
      </div>

      <div className="filter-group">
        <h4>Year: {filters.yearRange.min} - {filters.yearRange.max}</h4>
        <div className="slider-container">
          <input type="range" min="2000" max={nextYear} step="1" className="thumb thumb-left" value={filters.yearRange.min}
            onChange={(e) => setFilters({...filters, yearRange: {...filters.yearRange, min: Math.min(Number(e.target.value), filters.yearRange.max - 1)}})} />
          <input type="range" min="2000" max={nextYear} step="1" className="thumb thumb-right" value={filters.yearRange.max}
            onChange={(e) => setFilters({...filters, yearRange: {...filters.yearRange, max: Math.max(Number(e.target.value), filters.yearRange.min + 1)}})} />
          <div className="slider-track"></div>
          <div className="slider-range-highlight" style={getSelectionStyles(filters.yearRange.min, filters.yearRange.max, nextYear, 2000)}></div>
        </div>
      </div>

      <div className="filter-group">
        <h4>KMs: {filters.kmsRange.min} - {filters.kmsRange.max}</h4>
        <div className="slider-container">
          <input type="range" min="0" max="2000" step="50" className="thumb thumb-left" value={filters.kmsRange.min}
            onChange={(e) => setFilters({...filters, kmsRange: {...filters.kmsRange, min: Math.min(Number(e.target.value), filters.kmsRange.max - 50)}})} />
          <input type="range" min="0" max="2000" step="50" className="thumb thumb-right" value={filters.kmsRange.max}
            onChange={(e) => setFilters({...filters, kmsRange: {...filters.kmsRange, max: Math.max(Number(e.target.value), filters.kmsRange.min + 50)}})} />
          <div className="slider-track"></div>
          <div className="slider-range-highlight" style={getSelectionStyles(filters.kmsRange.min, filters.kmsRange.max, 2000, 0)}></div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
