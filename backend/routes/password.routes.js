const express = require("express");
const passwordController = require("../controllers/password.controller");

const router = express.Router();

router.post("/analyze", passwordController.analyzePassword);

module.exports = router;
