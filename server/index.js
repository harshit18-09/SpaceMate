import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import scanRoutes from "./routes/scanRoutes.js";

dotenv.config();
const app = express();

// ✅ CORS setup for localhost and mobile IP
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://172.25.209.204:5173"
  ],
  methods: ["GET", "POST", "PATCH", "DELETE"],
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/scan", scanRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    mongoose.connection.once('open', async () => {
      console.log(`✅ Connected to MongoDB database: ${mongoose.connection.name}`);
      const collections = await mongoose.connection.db.listCollections().toArray();
      console.log("📦 Available collections:", collections.map(c => c.name));
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
