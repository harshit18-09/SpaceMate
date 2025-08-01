import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ScanPage() {
  const router = useRouter();
  const { roomId } = router.query;

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [entryStatus, setEntryStatus] = useState(null); 


  useEffect(() => {
    if (!roomId) return;

    const fetchRoom = async () => {
      try {
        const res = await axios.get(`/api/scan/${roomId}`);
        setRoom(res.data.room); 
      } catch (err) {
        console.error('Room fetch error:', err);
        setRoom(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  const handleConfirmEntry = async () => {
    try {
      const res = await axios.post(`/api/scan/${roomId}/entry`);
      setEntryStatus('success');


      setRoom(res.data.room); 
    } catch (err) {
      console.error('Entry confirmation failed:', err);
      setEntryStatus('error');
    }
  };

  if (loading) return <div className="p-4">Loading room info...</div>;
  if (!room) return <div className="p-4 text-red-500">Room not found.</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-4">
        Room: {room.building} - {room.roomNumber}
      </h1>
      <p className="text-gray-700 mb-2">Floor: {room.floor}</p>
      <p className="text-gray-700 mb-2">Capacity: {room.capacity}</p>
      <p className="text-gray-700 mb-4">Current Count: {room.currentCount}</p>

      <button
        onClick={handleConfirmEntry}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Confirm Entry
      </button>

      {entryStatus === 'success' && (
        <p className="mt-4 text-green-600"> Entry confirmed successfully!</p>
      )}
      {entryStatus === 'error' && (
        <p className="mt-4 text-red-600"> Failed to confirm entry. Try again.</p>
      )}
    </div>
  );
}
