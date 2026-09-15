const express = require("express");

const router = express.Router();

router.get("/status", (req, res) => {
  res.json({
    success: true,
    service: "Security Service Toolkit",
    status: "online",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
