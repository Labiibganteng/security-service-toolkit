const express = require("express");
const ipController = require("../controllers/ip.controller");

const router = express.Router();

router.get("/", ipController.getIpInfo);

module.exports = router;
