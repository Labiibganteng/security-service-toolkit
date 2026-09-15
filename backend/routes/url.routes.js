const express = require("express");
const urlController = require("../controllers/url.controller");

const router = express.Router();

router.get("/", urlController.getUrlInfo);

module.exports = router;
