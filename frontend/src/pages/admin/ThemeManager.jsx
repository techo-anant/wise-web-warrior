import React from 'react';
import BackButton from '../../components/ui/BackButton';

const themes = [
  {
    id: 'default',
    name: 'Default',
    description: 'Clean professional look with neutral tones.',
    preview: { bg: '#fdfffd', accent: '#33dc9c', text: '#111111' },
  },
  {
    id: 'dark',
    name: 'Dark Luxury',
    description: 'Dark background with teal accents.',
    preview: { bg: '#333333', accent: '#33dc9c', text: '#fdfffd' },
  },
  {
    id: 'sport',
    name: 'Sport',
    description: 'Bold red and blue sporty color scheme.',
    preview: { bg: '#bbd3ec', accent: '#e63946', text: '#111111' },
  },
];

const ThemeManager = ({ currentTheme, setTheme }) => {
  return (
    <div className="compare-page">
      <header className="compare-header">
        {/* Back to admin dashboard */}
        <BackButton label="← Back to Admin" />
        <h1>Theme <span>Manager</span></h1>
        <p>Switch between site templates and preview color schemes.</p>
      </header>

      <div className="compare-table-container" style={{ color: 'var(--text-color)' }}>
        <p style={{ marginBottom: '25px', opacity: 0.8 }}>
          Currently active: <strong style={{ color: 'var(--accent-color)', textTransform: 'capitalize' }}>{currentTheme}</strong>
        </p>

        {/* Responsive theme cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {themes.map((t) => (
            <div
              key={t.id}
              onClick={() => setTheme(t.id)}
              style={{
                border: currentTheme === t.id
                  ? '2px solid var(--accent-color)'
                  : '1px solid rgba(128,128,128,0.3)',
                borderRadius: '15px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
            >
              {/* Color preview */}
              <div style={{ background: t.preview.bg, padding: '20px', borderBottom: `4px solid ${t.preview.accent}` }}>
                <div style={{ background: t.preview.accent, height: '8px', borderRadius: '4px', width: '60%' }} />
                <div style={{ background: t.preview.text, height: '6px', borderRadius: '4px', width: '80%', marginTop: '8px', opacity: 0.3 }} />
                <div style={{ background: t.preview.text, height: '6px', borderRadius: '4px', width: '50%', marginTop: '6px', opacity: 0.2 }} />
              </div>

              {/* Theme info */}
              <div style={{ padding: '15px', background: 'var(--bg-color)' }}>
                <h4 style={{ margin: '0 0 5px 0', color: 'var(--text-color)' }}>{t.name}</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.7, color: 'var(--text-color)' }}>{t.description}</p>
                {currentTheme === t.id && (
                  <span style={{
                    display: 'inline-block', marginTop: '10px',
                    background: 'var(--accent-color)', color: 'white',
                    padding: '3px 12px', borderRadius: '20px', fontSize: '0.75rem',
                  }}>
                    ✓ Active
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeManager;