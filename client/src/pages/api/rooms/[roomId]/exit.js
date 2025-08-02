// pages/api/scan/[roomId]/exit.js

import dbConnect from '@/lib/dbConnect';
import Room from '@/models/Room';

export default async function handler(req, res) {
  const {
    query: { roomId },
    method,
  } = req;

  await dbConnect();

  if (method !== 'POST') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }

  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ msg: 'Room not found' });
    }

    // Decrement the count only if it's greater than 0
    if (room.currentCount > 0) {
      room.currentCount -= 1;
      await room.save();
      return res.status(200).json({ msg: 'Exit recorded', room });
    } else {
      return res.status(400).json({ msg: 'Room is already empty' });
    }
  } catch (err) {
    console.error('[EXIT ERROR]', err);
    res.status(500).json({ msg: 'Server error' });
  }
}
