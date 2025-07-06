import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan"
// Import routes
import authRoutes from "./routes/auth.js";
import hrRoutes from "./routes/hr.js";
import adminRoutes from "./routes/admin.js";
import publicRoutes from "./routes/public.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({origin: ["http://dropsofchange.in", "http://www.dropsofchange.in"], credentials: true}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/hr", hrRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/public", publicRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server Connected" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({
      message: "File size is too large. Maximum size is 10MB.",
    });
  }
  
  if (err.message === "Invalid file type. Only JPEG, PNG, and WebP are allowed.") {
    return res.status(400).json({
      message: err.message,
    });
  }

  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
