import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RoomManager = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({
    building: '',
    floor: '',
    roomNumber: '',
    capacity: '',
  });

  const fetchRooms = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/rooms');
      setRooms(res.data);
    } catch (err) {
      console.error('Error fetching rooms:', err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleAddRoom = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/rooms', newRoom);
      setRooms([...rooms, res.data]);
      setNewRoom({ building: '', floor: '', roomNumber: '', capacity: '' });
      alert('Room added successfully!');
    } catch (err) {
      console.error('Error adding room:', err);
      alert(err.response?.data?.error || 'Something went wrong while adding the room.');
    }
  };

  const handleInputChange = (e) => {
    setNewRoom({ ...newRoom, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Room Manager</h2>

      {/* Add Room Form */}
      <div className="mb-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        <input
          type="text"
          name="building"
          placeholder="Building"
          value={newRoom.building}
          onChange={handleInputChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="floor"
          placeholder="Floor"
          value={newRoom.floor}
          onChange={handleInputChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="roomNumber"
          placeholder="Room Number"
          value={newRoom.roomNumber}
          onChange={handleInputChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={newRoom.capacity}
          onChange={handleInputChange}
          className="border p-2 rounded"
        />
        <button
          onClick={handleAddRoom}
          className="bg-blue-600 text-white rounded px-4 py-2"
        >
          Add Room
        </button>
      </div>

      {/* Existing Rooms */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {rooms.map((room) => {
          const occupancy = room.currentCount / room.capacity;
          let bgColor = 'bg-green-200';
          if (occupancy >= 0.8 && occupancy <= 1) bgColor = 'bg-yellow-200';
          if (occupancy > 1) bgColor = 'bg-red-200';

          return (
            <div
              key={room._id}
              className={`p-4 rounded shadow ${bgColor} flex flex-col gap-2`}
            >
              <div><strong>{room.building}</strong> - Floor {room.floor}</div>
              <div>Room: {room.roomNumber}</div>
              <div>Capacity: {room.capacity}</div>
              <div>Current Count: {room.currentCount}</div>
              {/* Optional edit/delete buttons can go here */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoomManager;
