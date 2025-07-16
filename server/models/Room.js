const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  building: {
    type: String,
    required: true
  },
  floor: {
    type: String,
    required: true
  },
  roomNumber: {
    type: String,
    required: true,
    unique: true
  },
  capacity: {
    type: Number,
    required: true
  },
  currentCount: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Room', roomSchema);
