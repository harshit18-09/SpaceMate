import { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";

function AdminDashboard() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get("http://172.25.232.196:5000/api/rooms");
        console.log("📦 Rooms fetched:", res.data);
        setRooms(res.data);
      } catch (err) {
        console.error("❌ Error fetching rooms:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {loading ? (
        <p>Loading rooms...</p>
      ) : rooms.length === 0 ? (
        <>
          <p>No rooms found.</p>
          <pre className="text-sm text-gray-500 mt-4">
            Debug: {JSON.stringify(rooms, null, 2)}
          </pre>
        </>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="rounded-lg p-4 shadow border"
            >
              <h2 className="text-xl font-semibold mb-1">
                {room.building} - {room.roomNumber}
              </h2>
              <p>Capacity: {room.capacity}</p>
              <p>Current: {room.currentCount}</p>

              <div className="mt-3">
                <h4 className="font-semibold mb-2">Scan QR to Enter</h4>
                <QRCodeSVG
                  value={`http://172.25.232.196:5173/scan/${room._id}`}
                  size={128}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
