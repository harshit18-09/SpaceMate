import { useEffect, useState } from 'react';
import ZoneModal from '../components/ZoneModal';
import './Map.css';

const getColor = (level) => {
  if (level <= 40) return 'green';
  if (level <= 70) return 'orange';
  return 'red';
};

export default function Map() {
  const [zones, setZones] = useState([]); // ⬅️ API data
  const [selectedZone, setSelectedZone] = useState(null); // ⬅️ Modal state

  useEffect(() => {
    fetch('http://localhost:5000/api/zones')
      .then(res => res.json())
      .then(data => setZones(data))
      .catch(err => console.error('Failed to fetch zones:', err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Campus Map Overview</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '1rem',
        marginTop: '2rem'
      }}>
        {zones.map((zone) => (
          <div
            key={zone.id}
            onClick={() => setSelectedZone(zone)}
            className="zone-card"
            style={{ backgroundColor: getColor(zone.level) }}
          >
            <h3 style={{ margin: 0 }}>{zone.name}</h3>
            <p style={{ margin: '0.5rem 0 0' }}>{zone.level}% crowded</p>
          </div>
        ))}
      </div>

      <ZoneModal zone={selectedZone} onClose={() => setSelectedZone(null)} />
    </div>
  );
}
