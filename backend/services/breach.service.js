function validateEmail(email) {
  if (!email || typeof email !== "string") {
    const error = new Error("Email is required");
    error.status = 400;
    throw error;
  }

  const cleaned = email.trim().toLowerCase();

  if (cleaned.length > 254) {
    const error = new Error("Invalid email length");
    error.status = 400;
    throw error;
  }

  const emailRegex =
    /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/;

  if (!emailRegex.test(cleaned)) {
    const error = new Error("Invalid email format");
    error.status = 400;
    throw error;
  }

  return cleaned;
}

function prepareBreachCheck(email) {
  const normalizedEmail = validateEmail(email);

  return {
    email: normalizedEmail,
    status: "ready_for_breach_check",
  };
}

module.exports = {
  validateEmail,
  prepareBreachCheck,
};
