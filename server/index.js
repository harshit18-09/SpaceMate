const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const zones = [
  { id: 1, name: 'Library', level: 20 },
  { id: 2, name: 'Canteen', level: 55 },
  { id: 3, name: 'Lab A', level: 80 },
  { id: 4, name: 'Lecture Hall', level: 35 },
  { id: 5, name: 'Auditorium', level: 65 },
];

app.post('/api/zones/update', (req, res) => {
  console.log('📥 Incoming Request:', req.body);

  const { id, level } = req.body;
  const zone = zones.find(z => z.id == Number(id));

  if (!zone) {
    console.log('❌ Zone not found for ID:', id);
    return res.status(404).json({ message: 'Zone not found' });
  }

  zone.level = Number(level);
  console.log('✅ Updated Zone:', zone);

  res.json({ message: `Zone ${zone.name} updated to ${zone.level}%` });
});


app.get('/api/zones', (req, res) => {
  res.json(zones);
});

app.listen(5000, () => {
  console.log('✅ Backend running at http://localhost:5000');
});
