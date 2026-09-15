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

function getUrlInfo(input) {
  const parsed = normalizeUrl(input);

  return {
    url: parsed.href,
    protocol: parsed.protocol.replace(":", ""),
    hostname: parsed.hostname,
    port: parsed.port || null,
    pathname: parsed.pathname,
    search: parsed.search || null,
  };
}

module.exports = {
  normalizeUrl,
  getUrlInfo,
};
