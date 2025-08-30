import { useEffect, useState } from "react";

export default function Home() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Campus Crowd Status</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Room</th>
            <th>Capacity</th>
            <th>Current Count</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room._id}>
              <td>{room.name}</td>
              <td>{room.capacity}</td>
              <td>{room.currentCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
