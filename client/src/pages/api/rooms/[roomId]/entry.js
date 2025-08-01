import dbConnect from '@/lib/dbConnect';
import Room from '@/models/Room';

export default async function handler(req, res) {
  const { roomId } = req.query;

  await dbConnect();

  if (req.method === 'POST') {
    try {
      const room = await Room.findById(roomId);

      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }


      if (room.currentCount >= room.capacity) {
        return res.status(400).json({ message: 'Room is full. Entry denied.' });
      }


      room.currentCount += 1;
      await room.save();

      res.status(200).json({ message: 'Entry confirmed', room });
    } catch (err) {
      console.error('Entry update error:', err);
      res.status(500).json({ message: 'Failed to confirm entry' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
