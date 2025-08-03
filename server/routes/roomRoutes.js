const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// GET all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    console.error('Error fetching rooms:', err);
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

// CREATE a new room
router.post('/', async (req, res) => {
  const { building, floor, roomNumber, capacity, currentCount } = req.body;
  try {
    const newRoom = new Room({
      building,
      floor,
      roomNumber,
      capacity,
      currentCount: currentCount || 0,
    });
    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (err) {
    console.error('Room creation error:', err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Room with this number already exists.' });
    }
    res.status(500).json({ error: 'Failed to create room' });
  }
});

// UPDATE a room completely
router.put('/:id', async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedRoom);
  } catch (err) {
    console.error('Error updating room:', err);
    res.status(500).json({ error: 'Failed to update room' });
  }
});

// 🔧 PATCH endpoint to update current crowd count
router.patch('/:id/count', async (req, res) => {
  const roomId = req.params.id;
  const { delta } = req.body; // expected: { delta: number }

  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    room.currentCount += delta;

    // Optional: prevent negative crowd count
    if (room.currentCount < 0) {
      room.currentCount = 0;
    }

    await room.save();
    res.json(room);
  } catch (err) {
    console.error('Error updating count:', err);
    res.status(500).json({ error: 'Failed to update crowd count' });
  }
});

// DELETE a room
router.delete('/:id', async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: 'Room deleted' });
  } catch (err) {
    console.error('Error deleting room:', err);
    res.status(500).json({ error: 'Failed to delete room' });
  }
});

// GET a single room by ID
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.json(room);
  } catch (err) {
    console.error('Error fetching room:', err);
    res.status(500).json({ error: 'Failed to fetch room' });
  }
});


module.exports = router;
