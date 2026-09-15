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

async function checkEmailBreach(email) {
  const normalizedEmail = validateEmail(email);

  const encodedEmail = encodeURIComponent(normalizedEmail);

  const response = await fetch(
    `https://api.xposedornot.com/v1/check-email/${encodedEmail}`
  );

  const data = await response.json();

  if (response.status === 404 || data.Error === "Not found") {
    return {
      email: normalizedEmail,
      breached: false,
      breaches: [],
    };
  }

  if (!response.ok) {
    const error = new Error(
      data.Error || "Failed to check email breach status"
    );
    error.status = response.status;
    throw error;
  }

  const rawBreaches = Array.isArray(data.breaches) ? data.breaches : [];

  const breaches = rawBreaches.flat();

  return {
    email: normalizedEmail,
    breached: breaches.length > 0,
    breachCount: breaches.length,
    breaches,
  };
}

module.exports = {
  validateEmail,
  checkEmailBreach,
};
