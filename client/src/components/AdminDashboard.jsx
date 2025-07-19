import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('/api/rooms');
        setRooms(response.data);
      } catch (err) {
        console.error('Error fetching rooms:', err);
      }
    };
    fetchRooms();
  }, []);

  const updateCount = async (id, delta) => {
    try {
      const response = await axios.patch(`/api/rooms/${id}/count`, { delta });
      setRooms((prev) =>
        prev.map((room) => (room._id === id ? response.data : room))
      );
    } catch (err) {
      console.error('Error updating count:', err);
    }
  };

  const getColor = (room) => {
    const percent = (room.currentCount / room.capacity) * 100;
    if (percent > 100) return 'bg-red-300';
    if (percent >= 80) return 'bg-yellow-300';
    return 'bg-green-300';
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <div key={room._id} className={`p-4 rounded-lg shadow ${getColor(room)}`}>
            <h2 className="text-lg font-semibold">{room.name}</h2>
            <p>Capacity: {room.capacity}</p>
            <p>Current: {room.currentCount}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => updateCount(room._id, -1)} className="px-2 py-1 bg-gray-200">-1</button>
              <button onClick={() => updateCount(room._id, 1)} className="px-2 py-1 bg-gray-200">+1</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
