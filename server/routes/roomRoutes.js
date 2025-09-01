import express from "express";
import Room from "../models/Room.js";

const router = express.Router();

// ✅ GET all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find({});
    console.log("🧪 Rooms fetched:", rooms);
    res.json(rooms);
  } catch (err) {
    console.error("❌ Error fetching rooms:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET single room by ID
router.get("/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found" });
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch room" });
  }
});

// ✅ Create room
router.post("/", async (req, res) => {
  try {
    const { building, roomNumber, capacity } = req.body;
    const newRoom = new Room({
      building,
      roomNumber,
      capacity,
      currentCount: 0,
    });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(500).json({ error: "Failed to create room" });
  }
});

// ✅ Update room count
router.patch("/:id/count", async (req, res) => {
  try {
    const { delta } = req.body;
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found" });

    room.currentCount = Math.max((room.currentCount || 0) + delta, 0);
    await room.save();
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: "Failed to update count" });
  }
});

// ✅ Delete room
router.delete("/:id", async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: "Room deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete room" });
  }
});

export default router;
