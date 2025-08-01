const express = require('express');
const router = express.Router();
const dbConnect = require('../lib/dbConnect');
const Room = require('../models/Room');

router.get('/:roomId', async (req, res) => {
  await dbConnect(); 

  const { roomId } = req.params;

  try {
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    room.lastScanned = new Date();
    await room.save();

    res.status(200).json({ success: true, room });
  } catch (err) {
    console.error('Scan error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
