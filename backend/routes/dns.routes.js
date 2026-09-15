const express = require("express");
const dnsController = require("../controllers/dns.controller");

const router = express.Router();

router.get("/", dnsController.lookupDomain);

module.exports = router;
