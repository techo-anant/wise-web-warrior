import React, { useState, useEffect } from 'react';
import { getAllCars, createCar, updateCar, deleteCar } from '../../services/carService';
import BackButton from '../../components/ui/BackButton';
import '../../pages/dynamic/Auth.css';

// Use 'tag' to match the database schema
const emptyForm = {
    make: '', model: '', year: '', price: '', mileage: '',
    category: 'sedan', tag: 'used', color: '',
    transmission: 'automatic', fuel_type: 'gasoline',
    engine: '', description: '', image_url: '', video_url: '',
};

const CarListingEditor = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => { fetchCars(); }, []);

    const fetchCars = async () => {
        try {
            const data = await getAllCars(1, 100);
            setCars(data.cars);
        } catch (err) {
            setError('Failed to load cars.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleAddNew = () => {
        setFormData(emptyForm);
        setEditingId(null);
        setShowForm(true);
        setError('');
        setSuccess('');
    };

    const handleEdit = (car) => {
        setFormData({
            make:         car.make,
            model:        car.model,
            year:         car.year,
            price:        car.price,
            mileage:      car.mileage,
            category:     car.category,
            tag:          car.tag,        // use tag not condition
            color:        car.color,
            transmission: car.transmission,
            fuel_type:    car.fuel_type,
            engine:       car.engine,
            description:  car.description,
            image_url:    car.image_url  || '',
            video_url:    car.video_url  || '',
        });
        setEditingId(car.id);
        setShowForm(true);
        setError('');
        setSuccess('');
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Remove this car listing?')) return;
        try {
            await deleteCar(id);
            setSuccess('Car removed successfully.');
            setCars(cars.filter(c => c.id !== id));
        } catch (err) {
            setError('Failed to remove car.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setSuccess('');
        try {
            if (editingId) {
                await updateCar(editingId, formData);
                setSuccess('Car updated successfully.');
                setCars(cars.map(c => c.id === editingId ? { ...c, ...formData } : c));
            } else {
                await createCar(formData);
                setSuccess('Car created successfully.');
                fetchCars();
            }
            setShowForm(false);
            setEditingId(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save car.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="compare-page"><p>Loading cars...</p></div>;

    return (
        <div className="compare-page">
            <header className="compare-header">
                <BackButton label="← Back to Admin" />
                <h1>Car Listing <span>Editor</span></h1>
                <p>Add, edit, or remove vehicle listings from the database.</p>
            </header>

            <div className="compare-table-container" style={{ color: 'var(--text-color)' }}>

                {success && <p style={{ color: 'green', marginBottom: '15px' }}>{success}</p>}
                {error   && <p style={{ color: 'red',   marginBottom: '15px' }}>{error}</p>}

                <button onClick={handleAddNew} className="clear-all-btn" style={{ marginBottom: '20px' }}>
                    + Add New Car
                </button>

                {/* ── CREATE / EDIT FORM ── */}
                {showForm && (
                    <div style={{ background: 'var(--bg-color)', border: '1px solid var(--accent-color)', borderRadius: '15px', padding: '25px', marginBottom: '30px' }}>
                        <h3 style={{ marginBottom: '20px' }}>{editingId ? 'Edit Car Listing' : 'Add New Car Listing'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                                {[
                                    { name: 'make',      placeholder: 'Make (e.g. Toyota)' },
                                    { name: 'model',     placeholder: 'Model (e.g. Camry)' },
                                    { name: 'year',      placeholder: 'Year (e.g. 2023)',   type: 'number' },
                                    { name: 'price',     placeholder: 'Price (e.g. 29999)', type: 'number' },
                                    { name: 'mileage',   placeholder: 'Mileage (km)',       type: 'number' },
                                    { name: 'color',     placeholder: 'Color (e.g. White)' },
                                    { name: 'engine',    placeholder: 'Engine (e.g. 2.5L V6)' },
                                    { name: 'image_url', placeholder: 'Image URL' },
                                    { name: 'video_url', placeholder: 'Video URL' },
                                ].map(({ name, placeholder, type = 'text' }) => (
                                    <input
                                        key={name}
                                        type={type}
                                        name={name}
                                        placeholder={placeholder}
                                        value={formData[name]}
                                        onChange={handleChange}
                                        required={!['image_url', 'video_url'].includes(name)}
                                        style={{ padding: '10px', borderRadius: '8px', border: '1px solid rgba(128,128,128,0.3)', background: 'transparent', color: 'var(--text-color)', width: '100%' }}
                                    />
                                ))}

                                {/* Category */}
                                <select name="category" value={formData.category} onChange={handleChange}
                                        style={{ padding: '10px', borderRadius: '8px', border: '1px solid rgba(128,128,128,0.3)', background: 'var(--bg-color)', color: 'var(--text-color)' }}>
                                    {['sedan', 'suv', 'truck', 'electric', 'coupe', 'van'].map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>

                                {/* Tag (was condition) — matches DB schema */}
                                <select name="tag" value={formData.tag} onChange={handleChange}
                                        style={{ padding: '10px', borderRadius: '8px', border: '1px solid rgba(128,128,128,0.3)', background: 'var(--bg-color)', color: 'var(--text-color)' }}>
                                    {['new', 'used', 'featured'].map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>

                                {/* Transmission */}
                                <select name="transmission" value={formData.transmission} onChange={handleChange}
                                        style={{ padding: '10px', borderRadius: '8px', border: '1px solid rgba(128,128,128,0.3)', background: 'var(--bg-color)', color: 'var(--text-color)' }}>
                                    <option value="automatic">Automatic</option>
                                    <option value="manual">Manual</option>
                                </select>

                                {/* Fuel type */}
                                <select name="fuel_type" value={formData.fuel_type} onChange={handleChange}
                                        style={{ padding: '10px', borderRadius: '8px', border: '1px solid rgba(128,128,128,0.3)', background: 'var(--bg-color)', color: 'var(--text-color)' }}>
                                    {['gasoline', 'diesel', 'electric', 'hybrid'].map(f => (
                                        <option key={f} value={f}>{f}</option>
                                    ))}
                                </select>
                            </div>

                            <textarea
                                name="description"
                                placeholder="Car description..."
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                style={{ width: '100%', marginTop: '15px', padding: '10px', borderRadius: '8px', border: '1px solid rgba(128,128,128,0.3)', background: 'transparent', color: 'var(--text-color)', resize: 'vertical' }}
                            />

                            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                                <button type="submit" className="clear-all-btn" disabled={saving}>
                                    {saving ? 'Saving...' : editingId ? 'Update Car' : 'Create Car'}
                                </button>
                                <button type="button" onClick={() => setShowForm(false)}
                                        style={{ background: 'transparent', border: '1px solid var(--accent-color)', color: 'var(--accent-color)', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer' }}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* ── CAR TABLE ── */}
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                        <tr style={{ borderBottom: '2px solid var(--accent-color)', textAlign: 'left' }}>
                            {['ID', 'Make', 'Model', 'Year', 'Price', 'Category', 'Tag', 'Actions'].map(h => (
                                <th key={h} style={{ padding: '12px', whiteSpace: 'nowrap', color: 'var(--text-color)' }}>{h}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {cars.map((car) => (
                            <tr key={car.id} style={{ borderBottom: '1px solid rgba(128,128,128,0.2)', color: 'var(--text-color)' }}>
                                <td style={{ padding: '12px' }}>{car.id}</td>
                                <td style={{ padding: '12px' }}>{car.make}</td>
                                <td style={{ padding: '12px' }}>{car.model}</td>
                                <td style={{ padding: '12px' }}>{car.year}</td>
                                <td style={{ padding: '12px' }}>${Number(car.price).toLocaleString()}</td>
                                <td style={{ padding: '12px', textTransform: 'capitalize' }}>{car.category}</td>
                                <td style={{ padding: '12px', textTransform: 'capitalize' }}>{car.tag}</td>
                                <td style={{ padding: '12px' }}>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button onClick={() => handleEdit(car)}
                                                style={{ background: 'var(--accent-color)', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem' }}>
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(car.id)}
                                                style={{ background: 'red', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem' }}>
                                            Remove
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CarListingEditor;