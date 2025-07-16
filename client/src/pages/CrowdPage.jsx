import { useEffect, useState } from 'react';
import axios from 'axios';

const CrowdPage = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await axios.get('http://localhost:5000/api/rooms/all');
      setRooms(res.data);
    };
    fetchRooms();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Live Crowd Status</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map(room => (
          <div key={room._id} className="border p-4 rounded shadow">
            <h3 className="font-semibold">{room.building} - Room {room.roomNumber}</h3>
            <p>Floor: {room.floor}</p>
            <p>Capacity: {room.capacity}</p>
            <p>Current Crowd: <strong>{room.currentCount}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrowdPage;
