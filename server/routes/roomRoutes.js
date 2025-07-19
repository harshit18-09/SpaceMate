const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// Get all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

// Create new room
router.post('/', async (req, res) => {
  const { name, maxCapacity } = req.body;
  try {
    const newRoom = new Room({ name, maxCapacity, currentCount: 0 });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create room' });
  }
});

// PATCH currentCount (+/- delta)
router.patch('/:id/count', async (req, res) => {
  const { id } = req.params;
  const { delta } = req.body;
  try {
    const room = await Room.findById(id);
    if (!room) return res.status(404).json({ error: 'Room not found' });

    room.currentCount = Math.max(0, room.currentCount + delta); // Prevent negative count
    await room.save();
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update count' });
  }
});

// PUT update name or maxCapacity
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, maxCapacity } = req.body;
  try {
    const room = await Room.findById(id);
    if (!room) return res.status(404).json({ error: 'Room not found' });

    room.name = name ?? room.name;
    room.maxCapacity = maxCapacity ?? room.maxCapacity;
    await room.save();
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update room' });
  }
});

// DELETE room
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findByIdAndDelete(id);
    if (!room) return res.status(404).json({ error: 'Room not found' });

    res.json({ message: 'Room deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete room' });
  }
});

module.exports = router;
