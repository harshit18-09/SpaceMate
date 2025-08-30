import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ScanRoom = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type') || 'entry';

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/rooms/${roomId}`);
        setRoom(res.data);
      } catch (err) {
        setError('Room not found or network error.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId, API_BASE_URL]);

  const handleConfirm = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/scan/${roomId}/${type}`);
      alert(`${type === 'exit' ? 'Exit' : 'Entry'} recorded!`);

      // ✅ Always send to admin dashboard (not old /dashboard)
      navigate('/admin/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>You're scanning for:</h2>
      <p>
        {room.building} - Room {room.roomNumber} (Capacity: {room.capacity})
      </p>

      <button
        onClick={handleConfirm}
        style={{
          backgroundColor: type === 'exit' ? 'red' : 'blue',
          color: 'white',
        }}
      >
        Confirm {type === 'exit' ? 'Exit' : 'Entry'}
      </button>
    </div>
  );
};

export default ScanRoom;
