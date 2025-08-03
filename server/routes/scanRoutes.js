// routes/scanRoutes.js

const express = require('express');
const router = express.Router();
const dbConnect = require('../lib/dbConnect');
const Room = require('../models/Room');

// GET room info (existing route)
router.get('/:roomId', async (req, res) => {
  await dbConnect();
  const { roomId } = req.params;

  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (err) {
    console.error('Scan GET error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ NEW: POST entry scan route
router.post('/:roomId/entry', async (req, res) => {
  await dbConnect();
  const { roomId } = req.params;

  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    room.currentCount += 1;
    room.lastScanned = new Date();
    await room.save();

    res.status(200).json({ success: true, room });
  } catch (err) {
    console.error('Scan POST error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
