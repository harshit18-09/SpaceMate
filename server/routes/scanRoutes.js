import express from "express";
import Room from "../models/Room.js";

const router = express.Router();

router.post("/:roomId/:type", async (req, res) => {
  const { roomId, type } = req.params;
  console.log(`🔔 Scan request received → Room: ${roomId}, Type: ${type}`);

  try {
    const room = await Room.findById(roomId);
    if (!room) {
      console.warn(`⚠️ Room not found: ${roomId}`);
      return res.status(404).json({ message: "Room not found" });
    }

    if (type === "entry") {
      room.currentCount = (room.currentCount || 0) + 1;
    } else if (type === "exit") {
      room.currentCount = Math.max((room.currentCount || 0) - 1, 0);
    } else {
      console.warn(`⚠️ Invalid scan type: ${type}`);
      return res.status(400).json({ message: "Invalid scan type" });
    }

    await room.save();
    console.log(`✅ Room updated → ${room.building}-${room.roomNumber}, Count: ${room.currentCount}`);
    res.json(room);
  } catch (err) {
    console.error("❌ Scan route error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
