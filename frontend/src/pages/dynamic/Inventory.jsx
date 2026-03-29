// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import Sidebar from '../../components/layout/Sidebar';
// import SearchBar from '../../components/ui/SearchBar';
// import './Inventory.css';
//
// const CAR_DATA = [
//   { id: 1, model: "Sleek Sedan", price: 35000, category: "sedan", make: "Toyota", condition: "Brand New", year: 2024, mileage: 0, image_url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800" },
//   { id: 2, model: "Mountain Crusher SUV", price: 52000, category: "suv", make: "Ford", condition: "Used", year: 2022, mileage: 1200, image_url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800" },
//   { id: 3, model: "Night Rider Coupe", price: 89000, category: "coupe", make: "Porsche", condition: "Brand New", year: 2024, mileage: 0, image_url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800" },
//   { id: 4, model: "Workhorse 1500", price: 44500, category: "truck", make: "RAM", condition: "Used", year: 2021, mileage: 1800, image_url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=800" }
// ];
//
// function Inventory() {
//   const location = useLocation();
//   const currentYear = new Date().getFullYear();
//   const nextYear = currentYear + 1;
//
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filters, setFilters] = useState({
//     types: [],
//     conditions: [],
//     priceRange: { min: 8000, max: 700000 },
//     yearRange: { min: 2000, max: nextYear },
//     kmsRange: { min: 0, max: 2000 }
//   });
//
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     let typeFromUrl = params.get('type');
//
//     if (typeFromUrl) {
//       if (typeFromUrl.endsWith('s')) {
//         typeFromUrl = typeFromUrl.slice(0, -1);
//       }
//
//       setFilters(prev => ({
//         ...prev,
//         types: [typeFromUrl]
//       }));
//     }
//   }, [location.search]);
//
//   const getSelectionStyles = (min, max, rangeMax, rangeMin = 0) => {
//     const left = ((min - rangeMin) / (rangeMax - rangeMin)) * 100;
//     const right = 100 - ((max - rangeMin) / (rangeMax - rangeMin)) * 100;
//     return { left: `${left}%`, right: `${right}%` };
//   };
//
//   const handleCheckbox = (category, value) => {
//     const updated = filters[category].includes(value)
//         ? filters[category].filter(item => item !== value)
//         : [...filters[category], value];
//     setFilters({ ...filters, [category]: updated });
//   };
//
//   const filteredCars = CAR_DATA.filter(car => {
//     const search = searchTerm.toLowerCase();
//
//     const matchesSearch =
//         car.model.toLowerCase().includes(search) ||
//         car.make.toLowerCase().includes(search) ||
//         car.year.toString().includes(search);
//
//     const matchesType = filters.types.length === 0 || filters.types.includes(car.category);
//     const matchesCondition = filters.conditions.length === 0 || filters.conditions.includes(car.condition);
//     const matchesPrice = car.price >= filters.priceRange.min && car.price <= filters.priceRange.max;
//     const matchesYear = car.year >= filters.yearRange.min && car.year <= filters.yearRange.max;
//     const matchesKms = car.mileage >= filters.kmsRange.min && car.mileage <= filters.kmsRange.max;
//
//     return matchesSearch && matchesType && matchesCondition && matchesPrice && matchesYear && matchesKms;
//   });
//
//   return (
//       <div className="inventory-page">
//         <div className="inventory-layout">
//           <Sidebar
//               filters={filters}
//               setFilters={setFilters}
//               handleCheckbox={handleCheckbox}
//               getSelectionStyles={getSelectionStyles}
//               nextYear={nextYear}
//           />
//
//           <div className="inventory-main">
//             <header className="inventory-header">
//               <h1>Our <span>Showroom</span></h1>
//               <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//             </header>
//
//             <div className="inventory-grid">
//               {filteredCars.map(car => (
//                   <div key={car.id} className="car-card">
//                     <div className="car-image" style={{ backgroundImage: `url(${car.image_url})` }}>
//                       <span className="car-tag">{car.condition}</span>
//                     </div>
//                     <div className="car-info">
//                       <span className="car-type-label">{car.category}</span>
//                       <h3>{car.year} {car.make} {car.model}</h3>
//                       <p className="price">${Number(car.price).toLocaleString()}</p>
//
//                       <div className="card-actions">
//                         <Link to={`/inventory/${car.id}`} className="view-details-btn">View Details</Link>
//                         <Link to={`/compare?id=${car.id}`} className="compare-btn-small">Compare</Link>
//                       </div>
//                     </div>
//                   </div>
//               ))}
//             </div>
//
//             {filteredCars.length === 0 && (
//                 <div className="no-results">
//                   <h3>No match for your filters</h3>
//                   <p>Try adjusting your search or filter settings.</p>
//                 </div>
//             )}
//           </div>
//         </div>
//       </div>
//   );
// }
//
// export default Inventory;

import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import SearchBar from '../../components/ui/SearchBar';
import { getAllCars, searchCars } from '../../services/carService';
import './Inventory.css';

function Inventory() {
    const location = useLocation();
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;

    // ── SEARCH STATE ──
    const [searchTerm, setSearchTerm] = useState('');

    // ── FILTER STATE ── (passed to Sidebar)
    const [filters, setFilters] = useState({
        types:      [],
        conditions: [],
        priceRange: { min: 8000,  max: 700000 },
        yearRange:  { min: 2000,  max: nextYear },
        kmsRange:   { min: 0,     max: 200000 },
    });

    // ── CAR DATA STATE ──
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // ── PAGINATION STATE ──
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const LIMIT = 9; // cars per page

    // Pre-select type from URL eg: /inventory?type=suv
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        let typeFromUrl = params.get('type');
        if (typeFromUrl) {
            if (typeFromUrl.endsWith('s')) typeFromUrl = typeFromUrl.slice(0, -1);
            setFilters(prev => ({ ...prev, types: [typeFromUrl] }));
        }
    }, [location.search]);

    // ── FETCH CARS FROM BACKEND ──
    // Re-runs whenever filters, search, or page changes
    const fetchCars = useCallback(async () => {
        setLoading(true);
        setError('');

        try {
            // Build active filters to send to backend
            const hasFilters =
                searchTerm ||
                filters.types.length > 0 ||
                filters.conditions.length > 0 ||
                filters.priceRange.min !== 8000 ||
                filters.priceRange.max !== 700000 ||
                filters.yearRange.min !== 2000 ||
                filters.yearRange.max !== nextYear;

            if (hasFilters) {
                // Use search endpoint when filters are active
                const params = {};

                if (searchTerm)              params.keyword  = searchTerm;
                if (filters.types.length > 0) params.category = filters.types[0]; // backend supports one category
                if (filters.priceRange.min !== 8000)    params.minPrice = filters.priceRange.min;
                if (filters.priceRange.max !== 700000)  params.maxPrice = filters.priceRange.max;
                if (filters.yearRange.min !== 2000)     params.minYear  = filters.yearRange.min;
                if (filters.yearRange.max !== nextYear) params.maxYear  = filters.yearRange.max;

                const data = await searchCars(params);

                // Apply mileage and condition filter locally since backend doesn't support them
                const filtered = data.filter(car => {
                    const matchesCondition =
                        filters.conditions.length === 0 ||
                        filters.conditions.map(c => c.toLowerCase()).includes((car.tag || '').toLowerCase());

                    const matchesKms =
                        car.mileage >= filters.kmsRange.min &&
                        car.mileage <= filters.kmsRange.max;

                    return matchesCondition && matchesKms;
                });

                // Manual pagination on filtered results
                const start = (page - 1) * LIMIT;
                const paginated = filtered.slice(start, start + LIMIT);

                setCars(paginated);
                setTotal(filtered.length);
                setTotalPages(Math.ceil(filtered.length / LIMIT));

            } else {
                // Use paginated endpoint when no filters
                const data = await getAllCars(page, LIMIT);
                setCars(data.cars);
                setTotal(data.pagination.total);
                setTotalPages(data.pagination.pages);
            }
        } catch (err) {
            setError('Failed to load inventory.');
        } finally {
            setLoading(false);
        }
    }, [filters, searchTerm, page, nextYear]);

    // Fetch on mount and when dependencies change
    useEffect(() => {
        fetchCars();
    }, [fetchCars]);

    // Reset to page 1 when filters or search change
    useEffect(() => {
        setPage(1);
    }, [filters, searchTerm]);

    const getSelectionStyles = (min, max, rangeMax, rangeMin = 0) => {
        const left  = ((min - rangeMin) / (rangeMax - rangeMin)) * 100;
        const right = 100 - ((max - rangeMin) / (rangeMax - rangeMin)) * 100;
        return { left: `${left}%`, right: `${right}%` };
    };

    const handleCheckbox = (category, value) => {
        const updated = filters[category].includes(value)
            ? filters[category].filter(item => item !== value)
            : [...filters[category], value];
        setFilters({ ...filters, [category]: updated });
    };

    return (
        <div className="inventory-page">
            <div className="inventory-layout">

                {/* Sidebar with filters */}
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
                        <p style={{ opacity: 0.7, marginBottom: '10px' }}>
                            {loading ? 'Loading...' : `${total} vehicle${total !== 1 ? 's' : ''} found`}
                        </p>
                        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    </header>

                    {/* Error message */}
                    {error && <p style={{ color: 'red', padding: '20px' }}>{error}</p>}

                    {/* Loading state */}
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '60px', opacity: 0.7 }}>
                            <p>Loading vehicles...</p>
                        </div>
                    ) : (
                        <>
                            {/* Car grid */}
                            <div className="inventory-grid">
                                {cars.map(car => (
                                    <div key={car.id} className="car-card">
                                        <div
                                            className="car-image"
                                            style={{ backgroundImage: `url(${car.image_url || 'https://via.placeholder.com/400x250?text=No+Image'})` }}
                                        >
                                            <span className="car-tag">{car.tag}</span>
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

                            {/* No results */}
                            {cars.length === 0 && (
                                <div className="no-results">
                                    <h3>No match for your filters</h3>
                                    <p>Try adjusting your search or filter settings.</p>
                                </div>
                            )}

                            {/* ── PAGINATION ── */}
                            {totalPages > 1 && (
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '30px 0',
                                    flexWrap: 'wrap',
                                }}>
                                    {/* Previous button */}
                                    <button
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        style={{
                                            padding: '8px 16px',
                                            borderRadius: '8px',
                                            border: '1px solid var(--accent-color)',
                                            background: 'transparent',
                                            color: 'var(--accent-color)',
                                            cursor: page === 1 ? 'not-allowed' : 'pointer',
                                            opacity: page === 1 ? 0.4 : 1,
                                        }}
                                    >
                                        ← Prev
                                    </button>

                                    {/* Page numbers */}
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                        <button
                                            key={p}
                                            onClick={() => setPage(p)}
                                            style={{
                                                padding: '8px 14px',
                                                borderRadius: '8px',
                                                border: '1px solid var(--accent-color)',
                                                background: page === p ? 'var(--accent-color)' : 'transparent',
                                                color: page === p ? 'white' : 'var(--accent-color)',
                                                cursor: 'pointer',
                                                fontWeight: page === p ? '700' : '400',
                                            }}
                                        >
                                            {p}
                                        </button>
                                    ))}

                                    {/* Next button */}
                                    <button
                                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                        disabled={page === totalPages}
                                        style={{
                                            padding: '8px 16px',
                                            borderRadius: '8px',
                                            border: '1px solid var(--accent-color)',
                                            background: 'transparent',
                                            color: 'var(--accent-color)',
                                            cursor: page === totalPages ? 'not-allowed' : 'pointer',
                                            opacity: page === totalPages ? 0.4 : 1,
                                        }}
                                    >
                                        Next →
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Inventory;