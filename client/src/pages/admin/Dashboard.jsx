import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/rooms`);
        setRooms(res.data);
      } catch (err) {
        setError("Error fetching rooms");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [API_BASE_URL]);

  if (loading) return <div>Loading rooms...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>
      <table border="1" cellPadding="10" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Building</th>
            <th>Room Number</th>
            <th>Capacity</th>
            <th>Current Count</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room._id}>
              <td>{room.building}</td>
              <td>{room.roomNumber}</td>
              <td>{room.capacity}</td>
              <td>{room.currentCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
