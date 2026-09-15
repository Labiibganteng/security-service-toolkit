function validateLocation(latitude, longitude) {
  const lat = Number(latitude);
  const lon = Number(longitude);

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    const error = new Error("Valid latitude and longitude are required");
    error.status = 400;
    throw error;
  }

  if (lat < -90 || lat > 90) {
    const error = new Error("Latitude must be between -90 and 90");
    error.status = 400;
    throw error;
  }

  if (lon < -180 || lon > 180) {
    const error = new Error("Longitude must be between -180 and 180");
    error.status = 400;
    throw error;
  }

  return {
    latitude: lat,
    longitude: lon,
  };
}

function createLocationResult(latitude, longitude, accuracy = null) {
  const location = validateLocation(latitude, longitude);

  return {
    latitude: location.latitude,
    longitude: location.longitude,
    accuracy:
      accuracy !== null && Number.isFinite(Number(accuracy))
        ? Number(accuracy)
        : null,
    source: "browser_geolocation_permission",
    timestamp: new Date().toISOString(),
  };
}

module.exports = {
  validateLocation,
  createLocationResult,
};
