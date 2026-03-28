import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { searchCars } from '../../services/carService';
import BackButton from '../../components/ui/BackButton';

const CATEGORIES = [
    { id: 'sedan',    label: 'Sedan',    icon: '🚗' },
    { id: 'suv',      label: 'SUV',      icon: '🚙' },
    { id: 'truck',    label: 'Truck',    icon: '🛻' },
    { id: 'electric', label: 'Electric', icon: '⚡' },
    { id: 'coupe',    label: 'Coupe',    icon: '🏎️' },
    { id: 'van',      label: 'Van',      icon: '🚐' },
];

const Category = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchByCategory = async () => {
            setLoading(true);
            try {
                const data = await searchCars({ category });
                setCars(data);
            } catch (err) {
                setError('Failed to load vehicles.');
            } finally {
                setLoading(false);
            }
        };
        if (category) fetchByCategory();
    }, [category]);

    const currentCategory = CATEGORIES.find(c => c.id === category);

    return (
        <div className="compare-page">
            <header className="compare-header">
                {/* Back to inventory */}
                <BackButton label="← Back to Inventory" />
                <h1>
                    {currentCategory?.icon} <span style={{ textTransform: 'capitalize' }}>
            {currentCategory?.label || category}
          </span>
                </h1>
                <p>Browsing all {currentCategory?.label || category} vehicles.</p>
            </header>

            {/* Category tabs */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', padding: '0 20px', marginBottom: '20px', justifyContent: 'center' }}>
                {CATEGORIES.map(cat => (
                    <button key={cat.id} onClick={() => navigate(`/category/${cat.id}`)}
                            style={{
                                padding: '8px 18px', borderRadius: '20px',
                                border: '1px solid var(--accent-color)',
                                background: category === cat.id ? 'var(--accent-color)' : 'transparent',
                                color: category === cat.id ? 'white' : 'var(--accent-color)',
                                cursor: 'pointer', fontWeight: '600',
                            }}>
                        {cat.icon} {cat.label}
                    </button>
                ))}
            </div>

            <div className="compare-table-container" style={{ color: 'var(--text-color)' }}>
                {loading && <p>Loading vehicles...</p>}
                {error   && <p style={{ color: 'red' }}>{error}</p>}

                {!loading && !error && (
                    <>
                        <p style={{ marginBottom: '20px', opacity: 0.7 }}>
                            {cars.length} vehicle{cars.length !== 1 ? 's' : ''} found
                        </p>
                        {cars.length === 0 ? (
                            <p>No vehicles available in this category.</p>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
                                {cars.map(car => (
                                    <div key={car.id} onClick={() => navigate(`/inventory/${car.id}`)}
                                         style={{ background: 'var(--card-bg)', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(128,128,128,0.2)' }}>
                                        <img
                                            src={car.image_url || 'https://via.placeholder.com/400x250?text=No+Image'}
                                            alt={`${car.make} ${car.model}`}
                                            style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                                        />
                                        <div style={{ padding: '15px' }}>
                                            <h4 style={{ margin: '0 0 5px 0', color: 'var(--accent-color)' }}>{car.year} {car.make} {car.model}</h4>
                                            <p style={{ margin: '0 0 5px 0', fontWeight: '700' }}>${Number(car.price).toLocaleString()}</p>
                                            <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.7 }}>{Number(car.mileage).toLocaleString()} km · {car.fuel_type}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Category;