import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCarById } from '../../services/carService';
import BackButton from '../../components/ui/BackButton';

const SavedCars = ({ user }) => {
    const navigate = useNavigate();
    const [savedCars, setSavedCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSavedCars = async () => {
            try {
                const saved = JSON.parse(localStorage.getItem('savedCars') || '[]');
                const carPromises = saved.map(id => getCarById(id));
                const cars = await Promise.all(carPromises);
                setSavedCars(cars.filter(Boolean));
            } catch (err) {
                console.error('Failed to load saved cars:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchSavedCars();
    }, []);

    const handleRemove = (id) => {
        const updated = savedCars.filter(c => c.id !== id);
        setSavedCars(updated);
        localStorage.setItem('savedCars', JSON.stringify(updated.map(c => c.id)));
    };

    const handleClearAll = () => {
        setSavedCars([]);
        localStorage.removeItem('savedCars');
    };

    if (loading) return <div className="compare-page"><p>Loading saved cars...</p></div>;

    return (
        <div className="compare-page">
            <header className="compare-header">
                {/* Back to previous page */}
                <BackButton label="← Back" />
                <h1>Saved <span>Vehicles</span></h1>
                <p>Your personal wishlist of vehicles.</p>
            </header>

            <div className="compare-table-container" style={{ color: 'var(--text-color)' }}>
                {savedCars.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                        <p style={{ fontSize: '1.1rem', opacity: 0.7, marginBottom: '20px' }}>
                            You haven't saved any vehicles yet.
                        </p>
                        <button className="clear-all-btn" onClick={() => navigate('/inventory')}>
                            Browse Inventory
                        </button>
                    </div>
                ) : (
                    <>
                        <button className="clear-all-btn" onClick={handleClearAll} style={{ marginBottom: '20px' }}>
                            Clear All
                        </button>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
                            {savedCars.map(car => (
                                <div key={car.id} style={{ background: 'var(--card-bg)', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(128,128,128,0.2)' }}>
                                    <img
                                        src={car.image_url || 'https://via.placeholder.com/400x250?text=No+Image'}
                                        alt={`${car.make} ${car.model}`}
                                        onClick={() => navigate(`/inventory/${car.id}`)}
                                        style={{ width: '100%', height: '180px', objectFit: 'cover', cursor: 'pointer' }}
                                    />
                                    <div style={{ padding: '15px' }}>
                                        <h4 onClick={() => navigate(`/inventory/${car.id}`)}
                                            style={{ margin: '0 0 5px 0', color: 'var(--accent-color)', cursor: 'pointer' }}>
                                            {car.year} {car.make} {car.model}
                                        </h4>
                                        <p style={{ margin: '0 0 5px 0', fontWeight: '700' }}>${Number(car.price).toLocaleString()}</p>
                                        <p style={{ margin: '0 0 15px 0', fontSize: '0.85rem', opacity: 0.7 }}>
                                            {Number(car.mileage).toLocaleString()} km · {car.transmission} · {car.fuel_type}
                                        </p>
                                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                            <button onClick={() => navigate(`/inventory/${car.id}`)}
                                                    style={{ flex: 1, background: 'var(--accent-color)', color: 'white', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                                                View Details
                                            </button>
                                            <button onClick={() => handleRemove(car.id)}
                                                    style={{ flex: 1, background: 'transparent', color: 'red', border: '1px solid red', padding: '8px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SavedCars;