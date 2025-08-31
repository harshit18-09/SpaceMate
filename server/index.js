import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import scanRoutes from "./routes/scanRoutes.js";

dotenv.config();
const app = express();

// ✅ Explicit CORS for mobile access
app.use(cors({
  origin: "http://172.25.232.196:5173", // your frontend IP + port
  methods: ["GET", "POST", "PATCH", "DELETE"],
}));

app.use(express.json());

// ✅ Route bindings
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/scan", scanRoutes);

// ✅ MongoDB connection
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    // ✅ Log the connected database name
    mongoose.connection.once('open', () => {
      console.log(`✅ Connected to MongoDB database: ${mongoose.connection.name}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
