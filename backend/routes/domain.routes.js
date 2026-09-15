const express = require("express");
const domainController = require("../controllers/domain.controller");

const router = express.Router();

router.get("/", domainController.getDomainInfo);

module.exports = router;
