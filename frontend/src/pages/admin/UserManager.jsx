import React, { useState, useEffect } from 'react';
import { getAllUsers, disableUser, promoteUser } from '../../services/userService';
import BackButton from '../../components/ui/BackButton';
import '../../pages/dynamic/Auth.css';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionMsg, setActionMsg] = useState('');

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  const handleDisable = async (id) => {
    if (!window.confirm('Disable this user account?')) return;
    try {
      await disableUser(id);
      setActionMsg('User disabled successfully.');
      setUsers(users.map(u => u.id === id ? { ...u, is_active: 0 } : u));
    } catch (err) {
      setError('Failed to disable user.');
    }
  };

  const handlePromote = async (id) => {
    if (!window.confirm('Promote this user to admin?')) return;
    try {
      await promoteUser(id);
      setActionMsg('User promoted to admin.');
      setUsers(users.map(u => u.id === id ? { ...u, role: 'admin' } : u));
    } catch (err) {
      setError('Failed to promote user.');
    }
  };

  if (loading) return <div className="compare-page"><p>Loading users...</p></div>;

  return (
    <div className="compare-page">
      <header className="compare-header">
        {/* Back to admin dashboard */}
        <BackButton label="← Back to Admin" />
        <h1>User <span>Manager</span></h1>
        <p>View and manage all registered user accounts.</p>
      </header>

      <div className="compare-table-container">
        {actionMsg && <p style={{ color: 'green', marginBottom: '15px' }}>{actionMsg}</p>}
        {error     && <p style={{ color: 'red',   marginBottom: '15px' }}>{error}</p>}

        {/* Responsive table wrapper */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-color)' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--accent-color)', textAlign: 'left' }}>
                {['ID', 'Name', 'Email', 'Role', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} style={{ borderBottom: '1px solid rgba(128,128,128,0.2)' }}>
                  <td style={{ padding: '12px' }}>{u.id}</td>
                  <td style={{ padding: '12px' }}>{u.name}</td>
                  <td style={{ padding: '12px' }}>{u.email}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      background: u.role === 'admin' ? 'var(--accent-color)' : 'rgba(128,128,128,0.2)',
                      color: u.role === 'admin' ? 'white' : 'var(--text-color)',
                      padding: '3px 10px', borderRadius: '20px', fontSize: '0.8rem',
                    }}>
                      {u.role}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ color: u.is_active ? 'green' : 'red', fontWeight: '600' }}>
                      {u.is_active ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {u.is_active === 1 && (
                        <button onClick={() => handleDisable(u.id)}
                          style={{ background: 'red', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem' }}>
                          Disable
                        </button>
                      )}
                      {u.role !== 'admin' && (
                        <button onClick={() => handlePromote(u.id)}
                          style={{ background: 'var(--accent-color)', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem' }}>
                          Promote
                        </button>
                      )}
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

export default UserManager;