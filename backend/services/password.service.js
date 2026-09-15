function analyzePassword(password) {
  if (typeof password !== "string") {
    const error = new Error("Password is required");
    error.status = 400;
    throw error;
  }

  if (password.length === 0) {
    const error = new Error("Password cannot be empty");
    error.status = 400;
    throw error;
  }

  const checks = {
    length8: password.length >= 8,
    length12: password.length >= 12,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;

  let strength;

  if (score <= 2) {
    strength = "weak";
  } else if (score <= 4) {
    strength = "medium";
  } else {
    strength = "strong";
  }

  const recommendations = [];

  if (!checks.length8) {
    recommendations.push("Use at least 8 characters");
  }

  if (!checks.length12) {
    recommendations.push("Prefer at least 12 characters");
  }

  if (!checks.lowercase) {
    recommendations.push("Add lowercase letters");
  }

  if (!checks.uppercase) {
    recommendations.push("Add uppercase letters");
  }

  if (!checks.number) {
    recommendations.push("Add numbers");
  }

  if (!checks.special) {
    recommendations.push("Add special characters");
  }

  return {
    length: password.length,
    score,
    maxScore: Object.keys(checks).length,
    strength,
    checks,
    recommendations,
  };
}

module.exports = {
  analyzePassword,
};
