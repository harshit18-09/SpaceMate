import { useEffect, useState } from 'react';
import ZoneModal from '../components/ZoneModal';

const getColor = (level) => {
  if (level <= 40) return 'bg-green-300';
  if (level <= 70) return 'bg-yellow-300';
  return 'bg-red-300';
};

export default function Map() {
  const [zones, setZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/zones')
      .then(res => res.json())
      .then(data => setZones(data))
      .catch(err => console.error('Failed to fetch zones:', err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Campus Map Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {zones.map((zone) => (
          <div
            key={zone.id}
            onClick={() => setSelectedZone(zone)}
            className={`cursor-pointer rounded-lg p-4 shadow hover:scale-[1.02] transition ${getColor(zone.level)}`}
          >
            <h3 className="text-lg font-semibold">{zone.name}</h3>
            <p className="text-sm mt-1">{zone.level}% crowded</p>
          </div>
        ))}
      </div>

      <ZoneModal zone={selectedZone} onClose={() => setSelectedZone(null)} />
    </div>
  );
}

