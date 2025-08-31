import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  building: { type: String, required: true },
  roomNumber: { type: String, required: true },
  capacity: { type: Number, required: true },
  currentCount: { type: Number, default: 0 },
});

export default mongoose.models.Room || mongoose.model('Room', RoomSchema);
