const express = require("express");
const metadataController = require("../controllers/metadata.controller");

const router = express.Router();

router.post("/analyze", metadataController.analyzeMetadata);

module.exports = router;
