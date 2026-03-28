import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ label = '← Back' }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        background: 'transparent',
        border: '1px solid var(--accent-color)',
        color: 'var(--accent-color)',
        padding: '8px 16px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        marginBottom: '20px',
      }}
    >
      {label}
    </button>
  );
};

export default BackButton;