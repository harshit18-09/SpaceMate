import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoomManager = () => {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    building: '',
    floor: '',
    roomNumber: '',
    capacity: ''
  });

  const fetchRooms = async () => {
    const res = await axios.get('http://localhost:5000/api/rooms/all');
    setRooms(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/rooms/add', form, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setForm({ building: '', floor: '', roomNumber: '', capacity: '' });
    fetchRooms();
  };

  const handleDelete = async (roomNumber) => {
    await axios.delete(`http://localhost:5000/api/rooms/delete/${roomNumber}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    fetchRooms();
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Room Manager</h2>

      <form onSubmit={handleAdd} className="mb-6">
        <input name="building" value={form.building} onChange={handleChange} placeholder="Building" className="border p-2 mr-2" required />
        <input name="floor" value={form.floor} onChange={handleChange} placeholder="Floor" className="border p-2 mr-2" required />
        <input name="roomNumber" value={form.roomNumber} onChange={handleChange} placeholder="Room #" className="border p-2 mr-2" required />
        <input name="capacity" value={form.capacity} onChange={handleChange} placeholder="Capacity" type="number" className="border p-2 mr-2" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Room</button>
      </form>

      <div>
        {rooms.map((room) => (
          <div key={room._id} className="border p-2 mb-2 flex flex-col gap-2">
            <div>
              <strong>{room.roomNumber}</strong> — {room.building}, {room.floor}
              <br />
              Capacity: {room.capacity}, Current: {room.currentCount}
            </div>

            {/* ✅ Update Count Form */}
            <form onSubmit={async (e) => {
              e.preventDefault();
              const count = e.target.elements[`count-${room.roomNumber}`].value;
              await axios.put(
                `http://localhost:5000/api/rooms/update-crowd/${room.roomNumber}`,
                { currentCount: count },
                {
                  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                }
              );
              fetchRooms();
            }}>
              <input
                type="number"
                name={`count-${room.roomNumber}`}
                placeholder="Update Count"
                className="border px-2 py-1 mr-2"
              />
              <button type="submit" className="bg-yellow-500 text-white px-2 py-1 rounded">
                Update Count
              </button>
            </form>

            <button
              onClick={() => handleDelete(room.roomNumber)}
              className="bg-red-500 text-white px-2 py-1 rounded w-fit"
            >
              Delete Room
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomManager;
