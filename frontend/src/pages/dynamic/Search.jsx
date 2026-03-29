import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchCars } from '../../services/carService';

const Search = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        keyword: '', category: '', minPrice: '',
        maxPrice: '', minYear: '', maxYear: '',
    });
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSearched(true);
        try {
            const activeFilters = Object.fromEntries(
                Object.entries(filters).filter(([_, v]) => v !== '')
            );
            const data = await searchCars(activeFilters);
            setResults(data);
        } catch (err) {
            setError('Search failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        padding: '10px', borderRadius: '8px',
        border: '1px solid rgba(128,128,128,0.3)',
        background: 'transparent', color: 'var(--text-color)', width: '100%',
    };

    return (
        <div className="compare-page">
            <header className="compare-header">
                <h1>Search <span>Vehicles</span></h1>
                <p>Filter by keyword, category, price range and more.</p>
            </header>

            <div className="compare-table-container" style={{ color: 'var(--text-color)' }}>
                <form onSubmit={handleSearch}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', marginBottom: '20px' }}>
                        <input type="text" name="keyword" placeholder="Keyword (make, model...)" value={filters.keyword} onChange={handleChange} style={inputStyle} />
                        <select name="category" value={filters.category} onChange={handleChange} style={{ ...inputStyle, background: 'var(--bg-color)' }}>
                            <option value="">All Categories</option>
                            {['sedan', 'suv', 'truck', 'electric', 'coupe', 'van'].map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                        <input type="number" name="minPrice" placeholder="Min Price" value={filters.minPrice} onChange={handleChange} style={inputStyle} />
                        <input type="number" name="maxPrice" placeholder="Max Price" value={filters.maxPrice} onChange={handleChange} style={inputStyle} />
                        <input type="number" name="minYear" placeholder="Min Year" value={filters.minYear} onChange={handleChange} style={inputStyle} />
                        <input type="number" name="maxYear" placeholder="Max Year" value={filters.maxYear} onChange={handleChange} style={inputStyle} />
                    </div>
                    <button type="submit" className="clear-all-btn" disabled={loading}>
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </form>

                {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}

                {searched && !loading && (
                    <div style={{ marginTop: '30px' }}>
                        <p style={{ marginBottom: '15px', opacity: 0.7 }}>
                            {results.length} result{results.length !== 1 ? 's' : ''} found
                        </p>
                        {results.length === 0 ? (
                            <p>No vehicles match your search. Try different filters.</p>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
                                {results.map(car => (
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
                                            <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.7 }}>{Number(car.mileage).toLocaleString()} km · {car.transmission} · {car.fuel_type}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
