const locationService = require("../services/location.service");

function saveLocation(req, res, next) {
  try {
    const { latitude, longitude, accuracy } = req.body;

    const result = locationService.createLocationResult(
      latitude,
      longitude,
      accuracy
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  saveLocation,
};
