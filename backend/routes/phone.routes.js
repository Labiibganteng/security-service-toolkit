const express = require("express");
const phoneController = require("../controllers/phone.controller");

const router = express.Router();

router.get("/", phoneController.getPhoneMetadata);

module.exports = router;
