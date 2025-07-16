const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const { verifyToken, requireAdmin } = require('../middleware/authMiddleware');

// Get all rooms (open to everyone)
router.get('/all', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rooms', error });
  }
});

// Add room (admin only)
router.post('/add', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { building, floor, roomNumber, capacity } = req.body;
    const newRoom = new Room({ building, floor, roomNumber, capacity });
    await newRoom.save();
    res.status(201).json({ message: 'Room added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding room', error });
  }
});

// Delete room (admin only)
router.delete('/delete/:roomNumber', verifyToken, requireAdmin, async (req, res) => {
  try {
    const room = await Room.findOneAndDelete({ roomNumber: req.params.roomNumber });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting room', error });
  }
});

// ✅ New: Update crowd count (admin only)
router.put('/update-crowd/:roomNumber', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { roomNumber } = req.params;
    const { currentCount } = req.body;

    const updated = await Room.findOneAndUpdate(
      { roomNumber },
      { currentCount },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating crowd count', error });
  }
});

module.exports = router;
