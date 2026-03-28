import React, { useState, useEffect } from 'react';
import { getStatus } from '../../services/monitorService';
import BackButton from '../../components/ui/BackButton';
import '../../pages/dynamic/Auth.css';

const Monitor = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastChecked, setLastChecked] = useState(null);

  useEffect(() => {
    fetchStatus();
    // Auto refresh every 30 seconds
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchStatus = async () => {
    try {
      const result = await getStatus();
      setData(result);
      setLastChecked(new Date().toLocaleTimeString());
      setError('');
    } catch (err) {
      setError('Failed to fetch system status.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="compare-page"><p>Checking system status...</p></div>;

  return (
    <div className="compare-page">
      <header className="compare-header">
        {/* Back to admin dashboard */}
        <BackButton label="← Back to Admin" />
        <h1>System <span>Monitor</span></h1>
        <p>Live status of all services and database health.</p>
      </header>

      <div className="compare-table-container" style={{ color: 'var(--text-color)' }}>
        {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}

        {data && (
          <>
            {/* Overall system status */}
            <div style={{
              background: data.system === 'online' ? 'rgba(0,200,0,0.1)' : 'rgba(200,0,0,0.1)',
              border: `1px solid ${data.system === 'online' ? 'green' : 'red'}`,
              borderRadius: '15px', padding: '20px', marginBottom: '25px', textAlign: 'center',
            }}>
              <h2 style={{ color: data.system === 'online' ? 'green' : 'red', margin: 0, textTransform: 'capitalize' }}>
                System: {data.system}
              </h2>
              <p style={{ margin: '5px 0 0 0', opacity: 0.7 }}>
                Last checked: {lastChecked} · Auto-refreshes every 30 seconds
              </p>
            </div>

            {/* Service cards grid — responsive */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
              {data.services.map((service, index) => (
                <div key={index} style={{
                  background: 'var(--bg-color)',
                  border: `1px solid ${service.status === 'online' ? 'green' : 'red'}`,
                  borderRadius: '12px', padding: '20px',
                }}>
                  <h4 style={{ margin: '0 0 8px 0' }}>{service.service}</h4>
                  <span style={{
                    background: service.status === 'online' ? 'green' : 'red',
                    color: 'white', padding: '3px 12px',
                    borderRadius: '20px', fontSize: '0.8rem', textTransform: 'capitalize',
                  }}>
                    {service.status}
                  </span>
                  {service.uptime && (
                    <p style={{ margin: '8px 0 0 0', opacity: 0.7, fontSize: '0.85rem' }}>
                      Uptime: {service.uptime}
                    </p>
                  )}
                  {service.error && (
                    <p style={{ margin: '8px 0 0 0', color: 'red', fontSize: '0.85rem' }}>
                      {service.error}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <button onClick={fetchStatus} className="clear-all-btn" style={{ marginTop: '25px' }}>
              Refresh Now
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Monitor;