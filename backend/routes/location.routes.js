const express = require("express");
const locationController = require("../controllers/location.controller");

const router = express.Router();

router.post("/save", locationController.saveLocation);

module.exports = router;
