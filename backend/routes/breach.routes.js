const express = require("express");
const breachController = require("../controllers/breach.controller");

const router = express.Router();

router.post("/check", breachController.prepareBreachCheck);

module.exports = router;
