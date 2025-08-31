import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [rooms, setRooms] = useState([]);
  const [adjustValues, setAdjustValues] = useState({});

  // Fetch rooms on mount
  useEffect(() => {
  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://172.25.232.196:5000/api/rooms');
      console.log('Debug:', response.data);
      setRooms(response.data);

      const initialAdjust = {};
      response.data.forEach((room) => {
        initialAdjust[room._id] = '';
      });
      setAdjustValues(initialAdjust);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  fetchRooms();
}, []);


  const updateCount = async (roomId, delta) => {
    if (!roomId || isNaN(delta)) return;

    try {
      const response = await axios.patch(`http://172.25.232.196:5000/api/rooms/${roomId}/count`, {
      delta,
      });

      setRooms((prev) =>
        prev.map((room) => (room._id === roomId ? response.data : room))
      );
    } catch (error) {
      console.error('Error updating count:', error);
      alert('Failed to update count');
    }
  };

  const handleInputChange = (roomId, value) => {
    // Allow empty string for user to delete everything and type freely
    if (value === '') {
      setAdjustValues((prev) => ({ ...prev, [roomId]: '' }));
      return;
    }

    const intVal = parseInt(value);
    if (!isNaN(intVal) && intVal > 0) {
      setAdjustValues((prev) => ({ ...prev, [roomId]: intVal }));
    }
  };

  const getTileColor = (room) => {
    const ratio = room.currentCount / room.capacity;
    if (ratio > 1) return 'bg-red-200 border-red-400';
    if (ratio >= 0.8) return 'bg-yellow-200 border-yellow-400';
    return 'bg-green-200 border-green-400';
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {rooms.length === 0 ? (
        <p>No rooms found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room) => (
            <div
              key={room._id}
              className={`rounded-lg p-4 shadow border transition ${getTileColor(room)}`}
            >
              <h2 className="text-xl font-semibold mb-1">
                {room.building} - {room.roomNumber}
              </h2>
              <p>Capacity: {room.capacity}</p>
              <p>Current: {room.currentCount}</p>

              <div className="mt-3">
                <div className="flex justify-center items-center mb-2 gap-2">
                  <button
                    onClick={() => updateCount(room._id, -(adjustValues[room._id] || 1))}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-xl"
                  >
                    -
                  </button>

                  <input
                    type="number"
                    min="1"
                    value={adjustValues[room._id] === '' ? '' : adjustValues[room._id]}
                    onChange={(e) => handleInputChange(room._id, e.target.value)}
                    className="w-16 border rounded px-2 py-1 text-center"
                    placeholder="1"
                  />

                  <button
                    onClick={() => updateCount(room._id, adjustValues[room._id] || 1)}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-xl"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
