import { useEffect, useState } from "react";
import axios from "axios";
import { Users } from "lucide-react";

function CrowdData() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/rooms");
        setRooms(res.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Crowd Data</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rooms.map((room) => (
          <div key={room._id} className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold mb-2">{room.name}</h2>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              <p className="font-semibold">{room.currentCount} / {room.capacity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CrowdPage;
