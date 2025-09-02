import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/ui/Loader";

function ScanRoom() {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [status, setStatus] = useState("");
  const [hasEntered, setHasEntered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`http://172.25.209.204:5000/api/rooms/${roomId}`);
        setRoom(res.data);
        const enteredRoom = localStorage.getItem("enteredRoom");
        if (enteredRoom === roomId) setHasEntered(true);
      } catch (err) {
        console.error("Error fetching room:", err);
        setStatus("Room not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  const handleEntry = async () => {
    try {
      await axios.post(`http://172.25.209.204:5000/api/scan/${roomId}/entry`);
      localStorage.setItem("enteredRoom", roomId);
      setHasEntered(true);
      setStatus("✅ Entry recorded.");
    } catch (err) {
      console.error("Entry error:", err);
      setStatus("❌ Failed to enter room.");
    }
  };

  const handleExit = async () => {
    try {
      await axios.post(`http://172.25.209.204:5000/api/scan/${roomId}/exit`);
      localStorage.removeItem("enteredRoom");
      setHasEntered(false);
      setStatus("✅ Exit recorded.");
    } catch (err) {
      console.error("Exit error:", err);
      setStatus("❌ Failed to exit room.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Scan Room</h1>

      {loading ? (
        <Loader />
      ) : room ? (
        <>
          <p className="mb-2 text-lg font-semibold">
            {room.building} - {room.roomNumber}
          </p>
          <p>Capacity: {room.capacity}</p>
          <p>Current Count: {room.currentCount}</p>

          <div className="mt-6">
            {!hasEntered ? (
              <button
                onClick={handleEntry}
                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Enter Room
              </button>
            ) : (
              <button
                onClick={handleExit}
                className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Exit Room
              </button>
            )}
          </div>

          {status && <p className="mt-4 text-lg">{status}</p>}
        </>
      ) : (
        <p className="text-red-500">{status || "Loading room..."}</p>
      )}
    </div>
  );
}

export default ScanRoom;
