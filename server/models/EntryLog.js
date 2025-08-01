const mongoose = require("mongoose");

const entryLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  entryTime: { type: Date, default: Date.now },
  exitTime: { type: Date, default: null }, 
  active: { type: Boolean, default: true }, 
});

module.exports = mongoose.model("EntryLog", entryLogSchema);
