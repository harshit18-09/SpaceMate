import dbConnect from '@/lib/dbConnect';
import Room from '@/models/Room';

export default async function handler(req, res) {
  await dbConnect();

  const { roomId } = req.query;

  if (req.method === 'GET') {
    try {
      const room = await Room.findById(roomId);
      if (!room) return res.status(404).json({ message: 'Room not found' });

      res.status(200).json(room);
    } catch (err) {
      console.error('GET room error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
