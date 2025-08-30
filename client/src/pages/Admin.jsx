import { useEffect, useState } from "react";

export default function Admin() {
  const [rooms, setRooms] = useState([]);
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");

  const fetchRooms = () => {
    fetch("http://localhost:5000/api/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const addRoom = async () => {
    await fetch("http://localhost:5000/api/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, capacity }),
    });
    setName("");
    setCapacity("");
    fetchRooms();
  };

  const deleteRoom = async (id) => {
    await fetch(`http://localhost:5000/api/rooms/${id}`, { method: "DELETE" });
    fetchRooms();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      <input
        placeholder="Room Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Capacity"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
      />
      <button onClick={addRoom}>Add Room</button>

      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Capacity</th>
            <th>Current Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((r) => (
            <tr key={r._id}>
              <td>{r.name}</td>
              <td>{r.capacity}</td>
              <td>{r.currentCount}</td>
              <td>
                <button onClick={() => deleteRoom(r._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
