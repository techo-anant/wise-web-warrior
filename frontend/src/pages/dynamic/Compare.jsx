// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import './Compare.css';
//
// const CAR_DATA = [
//     { id: 1, model: "Sleek Sedan", price: 35000, category: "sedan", make: "Toyota", year: 2024, mileage: 0, engine: "2.5L I4", fuel: "Hybrid", image_url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800" },
//     { id: 2, model: "Mountain Crusher SUV", price: 52000, category: "suv", make: "Ford", year: 2022, mileage: 1200, engine: "3.5L V6", fuel: "Gasoline", image_url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800" },
//     { id: 3, model: "Night Rider Coupe", price: 89000, category: "coupe", make: "Porsche", year: 2024, mileage: 0, engine: "3.0L Flat-6", fuel: "Premium", image_url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800" },
//     { id: 4, model: "Workhorse 1500", price: 44500, category: "truck", make: "RAM", year: 2021, mileage: 1800, engine: "5.7L V8 HEMI", fuel: "Gasoline", image_url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=800" }
// ];
//
// const Compare = () => {
//     const location = useLocation();
//     const [selectedIds, setSelectedIds] = useState([null, null, null]);
//
//     useEffect(() => {
//         const params = new URLSearchParams(location.search);
//         const idFromUrl = params.get('id');
//
//         if (idFromUrl) {
//             const parsedId = parseInt(idFromUrl);
//             if (!selectedIds.includes(parsedId)) {
//                 const newSelection = [...selectedIds];
//                 newSelection[0] = parsedId;
//                 setSelectedIds(newSelection);
//             }
//         }
//     }, [location.search]);
//
//     const handleSelect = (index, id) => {
//         const newSelection = [...selectedIds];
//         newSelection[index] = id ? parseInt(id) : null;
//         setSelectedIds(newSelection);
//     };
//
//     const getCar = (id) => CAR_DATA.find(c => c.id === id);
//
//     const specs = [
//         { label: "Price", key: "price", format: (v) => `$${v.toLocaleString()}` },
//         { label: "Make", key: "make" },
//         { label: "Model", key: "model" },
//         { label: "Year", key: "year" },
//         { label: "Category", key: "category" },
//         { label: "Mileage", key: "mileage", format: (v) => `${v.toLocaleString()} km` },
//         { label: "Engine", key: "engine" },
//         { label: "Fuel Type", key: "fuel" },
//     ];
//
//     return (
//         <div className="compare-page">
//             <header className="compare-header">
//                 <h1>Vehicle <span>Comparison</span></h1>
//                 <p>Select up to 3 vehicles to see how they stack up.</p>
//             </header>
//
//             <div className="compare-table-container">
//                 <button
//                     className="clear-all-btn"
//                     onClick={() => setSelectedIds([null, null, null])}
//                 >
//                     Clear All
//                 </button>
//
//                 <table className="compare-table">
//                     <thead>
//                         <tr>
//                             <th className="feature-col">Features</th>
//                             {[0, 1, 2].map(i => (
//                                 <th key={i} className="car-col">
//                                     <select
//                                         onChange={(e) => handleSelect(i, e.target.value)}
//                                         value={selectedIds[i] || ""}
//                                     >
//                                         <option value="">Select a Vehicle</option>
//                                         {CAR_DATA.map(car => (
//                                             <option key={car.id} value={car.id}>
//                                                 {car.make} {car.model}
//                                             </option>
//                                         ))}
//                                     </select>
//                                     {selectedIds[i] && (
//                                         <div className="compare-card-preview">
//                                             <img src={getCar(selectedIds[i]).image_url} alt="car" />
//                                         </div>
//                                     )}
//                                 </th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {specs.map(spec => (
//                             <tr key={spec.key}>
//                                 <td className="feature-label">{spec.label}</td>
//                                 {[0, 1, 2].map(i => {
//                                     const car = getCar(selectedIds[i]);
//                                     return (
//                                         <td key={i} className="feature-value">
//                                             {car ? (spec.format ? spec.format(car[spec.key]) : car[spec.key]) : "—"}
//                                         </td>
//                                     );
//                                 })}
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };
//
// export default Compare;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllCars } from '../../services/carService';
import BackButton from '../../components/ui/BackButton';
import './Compare.css';

const Compare = () => {
    const location = useLocation();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedIds, setSelectedIds] = useState([null, null, null]);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const data = await getAllCars(1, 100);
                setCars(data.cars);
            } catch (err) {
                console.error('Failed to load cars:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchCars();
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const idFromUrl = params.get('id');
        if (idFromUrl) {
            const parsedId = parseInt(idFromUrl);
            setSelectedIds(prev => {
                if (!prev.includes(parsedId)) {
                    const updated = [...prev];
                    updated[0] = parsedId;
                    return updated;
                }
                return prev;
            });
        }
    }, [location.search]);

    const handleSelect = (index, id) => {
        const updated = [...selectedIds];
        updated[index] = id ? parseInt(id) : null;
        setSelectedIds(updated);
    };

    const getCar = (id) => cars.find(c => c.id === id);

    const specs = [
        { label: 'Price',        key: 'price',        format: (v) => `$${Number(v).toLocaleString()}` },
        { label: 'Make',         key: 'make' },
        { label: 'Model',        key: 'model' },
        { label: 'Year',         key: 'year' },
        { label: 'Category',     key: 'category' },
        { label: 'Mileage',      key: 'mileage',      format: (v) => `${Number(v).toLocaleString()} km` },
        { label: 'Engine',       key: 'engine' },
        { label: 'Fuel Type',    key: 'fuel_type' },
        { label: 'Transmission', key: 'transmission' },
        { label: 'Color',        key: 'color' },
        { label: 'Condition',    key: 'tag' },
    ];

    if (loading) return <div className="compare-page"><p>Loading vehicles...</p></div>;

    return (
        <div className="compare-page">
            <header className="compare-header">
                {/* Back to previous page */}
                <BackButton label="← Back" />
                <h1>Vehicle <span>Comparison</span></h1>
                <p>Select up to 3 vehicles to see how they stack up.</p>
            </header>

            <div className="compare-table-container">
                <button className="clear-all-btn" onClick={() => setSelectedIds([null, null, null])}>
                    Clear All
                </button>

                <table className="compare-table">
                    <thead>
                    <tr>
                        <th className="feature-col">Features</th>
                        {[0, 1, 2].map(i => (
                            <th key={i} className="car-col">
                                <select onChange={(e) => handleSelect(i, e.target.value)} value={selectedIds[i] || ''}>
                                    <option value="">Select a Vehicle</option>
                                    {cars.map(car => (
                                        <option key={car.id} value={car.id}>
                                            {car.year} {car.make} {car.model}
                                        </option>
                                    ))}
                                </select>
                                {selectedIds[i] && getCar(selectedIds[i]) && (
                                    <div className="compare-card-preview">
                                        <img
                                            src={getCar(selectedIds[i]).image_url || 'https://via.placeholder.com/300x200?text=No+Image'}
                                            alt="car"
                                        />
                                    </div>
                                )}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {specs.map(spec => (
                        <tr key={spec.key}>
                            <td className="feature-label">{spec.label}</td>
                            {[0, 1, 2].map(i => {
                                const car = getCar(selectedIds[i]);
                                const val = car?.[spec.key];
                                return (
                                    <td key={i} className="feature-value">
                                        {car ? (val != null ? (spec.format ? spec.format(val) : val) : 'N/A') : '—'}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Compare;