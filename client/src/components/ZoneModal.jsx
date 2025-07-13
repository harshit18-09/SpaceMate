export default function ZoneModal({ zone, onClose }) {
  if (!zone) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#fff',
        padding: '2rem',
        borderRadius: '12px',
        minWidth: '320px',
        textAlign: 'center',
        boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            border: 'none',
            background: 'transparent',
            fontSize: '1.2rem',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>
        <h2 style={{ marginBottom: '1rem' }}>{zone.name}</h2>
        <p><strong>{zone.level}%</strong> crowded</p>
        <p>Status: {zone.level <= 40 ? "Low" : zone.level <= 70 ? "Moderate" : "High"}</p>
      </div>
    </div>
  );
}
