function normalizePhone(phone) {
  if (!phone || typeof phone !== "string") {
    const error = new Error("Phone number is required");
    error.status = 400;
    throw error;
  }

  const cleaned = phone.trim().replace(/[\s()-]/g, "");

  if (!/^\+?[1-9]\d{7,14}$/.test(cleaned)) {
    const error = new Error("Invalid phone number format");
    error.status = 400;
    throw error;
  }

  return cleaned;
}

function getPhoneMetadata(phone) {
  const normalized = normalizePhone(phone);

  return {
    phone: normalized,
    format: normalized.startsWith("+") ? "international" : "national_or_unknown",
  };
}

module.exports = {
  normalizePhone,
  getPhoneMetadata,
};
