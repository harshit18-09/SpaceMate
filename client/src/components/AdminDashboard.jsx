import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Building2, PlusCircle } from "lucide-react";

function AdminDashboard() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/rooms");
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <Card key={room._id} className="rounded-2xl shadow-md hover:shadow-lg transition">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Building2 className="h-12 w-12 text-blue-500 mb-3" />
            <h2 className="text-xl font-bold">{room.name}</h2>
            <p className="text-gray-600">{room.capacity} Capacity</p>
            <div className="flex items-center gap-2 mt-4">
              <Users className="h-5 w-5 text-green-600" />
              <span className="text-lg font-semibold">{room.currentCount}</span>
            </div>
          </CardContent>
        </Card>
      ))}
      <Card className="flex items-center justify-center rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer">
        <CardContent className="p-6 text-center">
          <PlusCircle className="h-12 w-12 text-gray-400 mb-2" />
          <p className="text-gray-500">Add New Room</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminDashboard;
