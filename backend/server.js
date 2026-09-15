const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security headers
app.use(helmet());

// CORS
app.use(cors());

// JSON parser
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

app.use("/api", limiter);

// Frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Security Service Toolkit API is running",
    status: "online",
  });
});

// Homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Server
app.listen(PORT, () => {
  console.log("=================================");
  console.log(" Security Service Toolkit");
  console.log("=================================");
  console.log(`Server running on port ${PORT}`);
  console.log(`Local: http://localhost:${PORT}`);
  console.log("=================================");
});
