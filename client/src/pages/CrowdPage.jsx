import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users } from "lucide-react"; // Optional: for crowd icon

const CrowdPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/rooms");
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const getColor = (current, max) => {
    const ratio = current / max;
    if (ratio > 1) return "bg-red-500";
    if (ratio >= 0.8) return "bg-yellow-400";
    return "bg-green-500";
  };

  const getPercentage = (current, max) =>
    Math.min(Math.round((current / max) * 100), 100);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading crowd data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        📊 Live Crowd Levels
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((room) => {
          const color = getColor(room.currentCount, room.maxCapacity);
          const percent = getPercentage(room.currentCount, room.maxCapacity);

          return (
            <div
              key={room._id}
              className="bg-white rounded-2xl shadow-md p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {room.name}
                </h3>
                <Users className="text-gray-500" />
              </div>

              <p className="text-gray-700 mb-2 text-sm">
                Crowd:{" "}
                <span className="font-medium text-gray-900">
                  {room.currentCount} / {room.maxCapacity}
                </span>
              </p>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className={`h-full ${color} transition-all duration-300`}
                  style={{ width: `${percent}%` }}
                />
              </div>

              <p className="text-right mt-1 text-xs text-gray-500">
                {percent}% full
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CrowdPage;

