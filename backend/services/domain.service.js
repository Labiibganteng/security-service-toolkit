function normalizeDomain(domain) {
  if (!domain || typeof domain !== "string") {
    const error = new Error("Domain is required");
    error.status = 400;
    throw error;
  }

  const cleaned = domain.trim().toLowerCase();

  if (cleaned.length > 253) {
    const error = new Error("Invalid domain length");
    error.status = 400;
    throw error;
  }

  const domainRegex =
    /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/;

  if (!domainRegex.test(cleaned)) {
    const error = new Error("Invalid domain format");
    error.status = 400;
    throw error;
  }

  return cleaned;
}

function getDomainInfo(domain) {
  const normalized = normalizeDomain(domain);

  return {
    domain: normalized,
  };
}

module.exports = {
  normalizeDomain,
  getDomainInfo,
};
