import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Trash2 } from "lucide-react";

function RoomManager() {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get("/api/rooms");
        setRooms(res.data);
      } catch (error) {
        console.error("Error fetching rooms", error);
      }
    };
    fetchRooms();
  }, []);

  const addRoom = async () => {
    if (!newRoom.trim()) return;
    try {
      const res = await axios.post("/api/rooms", { name: newRoom, capacity: 50 });
      setRooms([...rooms, res.data]);
      setNewRoom("");
    } catch (error) {
      console.error("Error adding room", error);
    }
  };

  const deleteRoom = async (id) => {
    try {
      await axios.delete(`/api/rooms/${id}`);
      setRooms(rooms.filter((room) => room._id !== id));
    } catch (error) {
      console.error("Error deleting room", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Room Manager</h1>
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={newRoom}
          onChange={(e) => setNewRoom(e.target.value)}
          placeholder="Enter room name"
          className="px-4 py-2 border rounded-lg flex-1"
        />
        <button
          onClick={addRoom}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="h-5 w-5" /> Add
        </button>
      </div>
      <ul className="space-y-3">
        {rooms.map((room) => (
          <li
            key={room._id}
            className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm"
          >
            <span>{room.name}</span>
            <button
              onClick={() => deleteRoom(room._id)}
              className="text-red-500 hover:text-red-700 flex items-center gap-1"
            >
              <Trash2 className="h-5 w-5" /> Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoomManager;
