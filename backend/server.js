const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");

const config = require("./config/environment");
const errorHandler = require("./middleware/errorHandler");
const systemRoutes = require("./routes/system.routes");
const ipRoutes = require("./routes/ip.routes");
const dnsRoutes = require("./routes/dns.routes");
const phoneRoutes = require("./routes/phone.routes");
const domainRoutes = require("./routes/domain.routes");
const urlRoutes = require("./routes/url.routes");
const passwordRoutes = require("./routes/password.routes");
const breachRoutes = require("./routes/breach.routes");
const metadataRoutes = require("./routes/metadata.routes");
const app = express();

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

// API routes
app.use("/api/system", systemRoutes);
app.use("/api/ip", ipRoutes);
app.use("/api/dns", dnsRoutes);
app.use("/api/phone", phoneRoutes);
app.use("/api/domain", domainRoutes);
app.use("/api/url", urlRoutes);
app.use("/api/password", passwordRoutes);
app.use("/api/breach", breachRoutes);
app.use("/api/metadata", metadataRoutes);
// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Security Service Toolkit API is running",
    status: "online",
    environment: config.nodeEnv,
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

// Error handler
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log("=================================");
  console.log(" Security Service Toolkit");
  console.log("=================================");
  console.log(`Environment: ${config.nodeEnv}`);
  console.log(`Server running on port ${config.port}`);
  console.log(`Local: http://localhost:${config.port}`);
  console.log("=================================");
});
