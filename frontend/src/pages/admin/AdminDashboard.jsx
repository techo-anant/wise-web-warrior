import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCars } from '../../services/carService';
import { getAllUsers } from '../../services/userService';
import { getStatus } from '../../services/monitorService';
import BackButton from '../../components/ui/BackButton';
import '../../pages/dynamic/Auth.css';

const AdminDashboard = ({ user }) => {
    const [stats, setStats] = useState({
        totalCars:    0,
        totalUsers:   0,
        systemStatus: 'checking...',
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const carData     = await getAllCars(1, 1);
                const userData    = await getAllUsers();
                const monitorData = await getStatus();
                setStats({
                    totalCars:    carData.pagination.total,
                    totalUsers:   userData.length,
                    systemStatus: monitorData.system,
                });
            } catch (err) {
                console.error('Failed to load admin stats:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    // Reusable stat card style — uses solid var(--card-bg) instead of broken rgba accent
    const statCard = {
        background:   'var(--card-bg)',
        border:       '1px solid var(--accent-color)',
        padding:      '25px',
        borderRadius: '15px',
        textAlign:    'center',
    };

    // Reusable action card style
    const actionCard = {
        background:   'var(--bg-color)',
        padding:      '25px',
        borderRadius: '20px',
        border:       '1px solid var(--accent-color)',
    };

    return (
        <div className="compare-page">
            <header className="compare-header">
                <BackButton label="← Back to Dashboard" />
                <h1 style={{ color: 'var(--accent-color)' }}>Admin <span>Control Center</span></h1>
                <p>Welcome, <strong>{user?.name}</strong> — System Overview & Management Tools</p>
            </header>

            <div className="compare-table-container">
                <div style={{ color: 'var(--text-color)' }}>

                    {/* ── STATS ROW ── */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>

                        <div style={statCard}>
                            <h2 style={{ color: 'var(--accent-color)', margin: '0 0 5px 0' }}>
                                {loading ? '...' : stats.totalCars}
                            </h2>
                            <p style={{ margin: 0, opacity: 0.8 }}>Total Listings</p>
                        </div>

                        <div style={statCard}>
                            <h2 style={{ color: 'var(--accent-color)', margin: '0 0 5px 0' }}>
                                {loading ? '...' : stats.totalUsers}
                            </h2>
                            <p style={{ margin: 0, opacity: 0.8 }}>Registered Users</p>
                        </div>

                        <div style={statCard}>
                            <h2 style={{
                                color: stats.systemStatus === 'online' ? 'green' : 'red',
                                margin: '0 0 5px 0',
                                textTransform: 'capitalize',
                            }}>
                                {loading ? '...' : stats.systemStatus}
                            </h2>
                            <p style={{ margin: 0, opacity: 0.8 }}>System Status</p>
                        </div>

                    </div>

                    {/* ── ADMIN ACTION CARDS ── */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>

                        <div style={actionCard}>
                            <h3>📦 Inventory Management</h3>
                            <p>Add new vehicles, update prices, or remove sold listings.</p>
                            <button className="clear-all-btn" style={{ fontSize: '0.8rem' }} onClick={() => navigate('/admin/cars')}>
                                Manage Cars
                            </button>
                        </div>

                        <div style={actionCard}>
                            <h3>👥 User Management</h3>
                            <p>View registered members, disable accounts, or promote to admin.</p>
                            <button className="clear-all-btn" style={{ fontSize: '0.8rem' }} onClick={() => navigate('/admin/users')}>
                                Manage Users
                            </button>
                        </div>

                        <div style={actionCard}>
                            <h3>🎨 Theme Manager</h3>
                            <p>Switch between site templates and customize the look and feel.</p>
                            <button className="clear-all-btn" style={{ fontSize: '0.8rem' }} onClick={() => navigate('/admin/themes')}>
                                Manage Themes
                            </button>
                        </div>

                        <div style={actionCard}>
                            <h3>🖥️ System Monitor</h3>
                            <p>Check the live status of all services, database, and API health.</p>
                            <button className="clear-all-btn" style={{ fontSize: '0.8rem' }} onClick={() => navigate('/admin/monitor')}>
                                View Monitor
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;