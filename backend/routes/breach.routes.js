const express = require("express");
const breachController = require("../controllers/breach.controller");

const router = express.Router();

router.post("/check", breachController.checkEmailBreach);

module.exports = router;
