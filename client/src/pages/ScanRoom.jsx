import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ScanRoom = () => {
  const { roomId } = useParams(); 
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`/api/rooms/${roomId}`);
        setRoom(res.data);
      } catch (err) {
        setError('Room not found or network error.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  const handleConfirmEntry = async () => {
    try {
      const userId = localStorage.getItem('userId'); 
      const res = await axios.post('/api/entry/enter', {
        userId,
        roomId,
      });

      alert('Entry recorded!');
      navigate('/dashboard'); 
    } catch (err) {
      alert(err.response?.data?.msg || 'Something went wrong');
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold">You're scanning for:</h2>
      <p className="text-lg my-2">{room.name} (Capacity: {room.maxCapacity})</p>

      <button
        onClick={handleConfirmEntry}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Confirm Entry
      </button>
    </div>
  );
};

export default ScanRoom;
