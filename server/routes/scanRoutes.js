import express from "express";
import Room from "../models/Room.js";

const router = express.Router();

// ✅ Scan Entry
router.post("/:roomId/entry", async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);
    if (!room) return res.status(404).json({ error: "Room not found" });

    if (room.currentCount < room.capacity) {
      room.currentCount += 1;
      await room.save();
      res.json(room);
    } else {
      res.status(400).json({ error: "Room is full" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to update room entry" });
  }
});

// ✅ Scan Exit
router.post("/:roomId/exit", async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);
    if (!room) return res.status(404).json({ error: "Room not found" });

    if (room.currentCount > 0) {
      room.currentCount -= 1;
      await room.save();
      res.json(room);
    } else {
      res.status(400).json({ error: "Room count already 0" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to update room exit" });
  }
});

export default router;
