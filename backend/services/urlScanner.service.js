function normalizeUrl(input) {
  if (!input || typeof input !== "string") {
    const error = new Error("URL is required");
    error.status = 400;
    throw error;
  }

  let value = input.trim();

  if (!/^https?:\/\//i.test(value)) {
    value = `https://${value}`;
  }

  let parsed;

  try {
    parsed = new URL(value);
  } catch {
    const error = new Error("Invalid URL format");
    error.status = 400;
    throw error;
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    const error = new Error("Only HTTP and HTTPS URLs are allowed");
    error.status = 400;
    throw error;
  }

  if (!parsed.hostname) {
    const error = new Error("URL hostname is required");
    error.status = 400;
    throw error;
  }

  return parsed;
}

function analyzeUrl(input) {
  const parsed = normalizeUrl(input);

  const hostname = parsed.hostname.toLowerCase();

  const indicators = [];
  const warnings = [];

  // HTTPS check
  const usesHttps = parsed.protocol === "https:";

  if (!usesHttps) {
    indicators.push("no_https");
    warnings.push("URL does not use HTTPS");
  }

  // IP address check
  const isIPv4 =
    /^(?:\d{1,3}\.){3}\d{1,3}$/.test(hostname);

  const isIPv6 = hostname.includes(":");

  const isIpAddress = isIPv4 || isIPv6;

  if (isIpAddress) {
    indicators.push("ip_address");
    warnings.push("URL uses an IP address instead of a domain name");
  }

  // Punycode / IDN check
  const hasPunycode = hostname.includes("xn--");

  if (hasPunycode) {
    indicators.push("punycode");
    warnings.push("Hostname contains punycode");
  }

  // Credentials inside URL
  const hasCredentials = Boolean(parsed.username || parsed.password);

  if (hasCredentials) {
    indicators.push("embedded_credentials");
    warnings.push("URL contains embedded username or password");
  }

  // Suspicious URL characters
  const suspiciousCharacters = /[%@]/.test(parsed.href);

  if (suspiciousCharacters && !hasCredentials) {
    indicators.push("special_characters");
  }

  // Long URL
  const isVeryLong = parsed.href.length > 200;

  if (isVeryLong) {
    indicators.push("long_url");
    warnings.push("URL is unusually long");
  }

  // Excessive subdomains
  const labels = hostname.split(".");
  const subdomainCount = Math.max(labels.length - 2, 0);

  if (subdomainCount >= 4) {
    indicators.push("many_subdomains");
    warnings.push("Hostname contains many subdomains");
  }

  // Non-standard port
  const port = parsed.port || null;

  const standardPort =
    !port ||
    (parsed.protocol === "http:" && port === "80") ||
    (parsed.protocol === "https:" && port === "443");

  if (!standardPort) {
    indicators.push("non_standard_port");
    warnings.push("URL uses a non-standard port");
  }

  // Common suspicious keywords
  const suspiciousKeywords = [
    "login",
    "verify",
    "verification",
    "secure",
    "account",
    "password",
    "update",
    "confirm",
    "signin",
    "bank",
  ];

  const lowerUrl = parsed.href.toLowerCase();

  const matchedKeywords = suspiciousKeywords.filter((keyword) =>
    lowerUrl.includes(keyword)
  );

  if (matchedKeywords.length > 0) {
    indicators.push("suspicious_keywords");
  }

  // Risk score
  let riskScore = 0;

  if (!usesHttps) riskScore += 25;
  if (isIpAddress) riskScore += 25;
  if (hasPunycode) riskScore += 20;
  if (hasCredentials) riskScore += 25;
  if (isVeryLong) riskScore += 10;
  if (subdomainCount >= 4) riskScore += 10;
  if (!standardPort) riskScore += 10;
  if (matchedKeywords.length > 0) riskScore += 5;

  riskScore = Math.min(riskScore, 100);

  let riskLevel;

  if (riskScore >= 60) {
    riskLevel = "high";
  } else if (riskScore >= 30) {
    riskLevel = "medium";
  } else {
    riskLevel = "low";
  }

  return {
    url: parsed.href,
    protocol: parsed.protocol.replace(":", ""),
    hostname,
    port,
    pathname: parsed.pathname,
    search: parsed.search || null,

    security: {
      usesHttps,
      isIpAddress,
      hasPunycode,
      hasCredentials,
      isVeryLong,
      subdomainCount,
      matchedKeywords,
      indicators,
      warnings,
      riskScore,
      riskLevel,
    },
  };
}

module.exports = {
  normalizeUrl,
  analyzeUrl,
};
