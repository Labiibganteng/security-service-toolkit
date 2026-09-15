const dns = require("dns").promises;

function validateDomain(domain) {
  if (!domain || typeof domain !== "string") {
    return false;
  }

  const value = domain.trim().toLowerCase();

  if (value.length > 253) {
    return false;
  }

  const domainRegex =
    /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/;

  return domainRegex.test(value);
}

async function lookupDomain(domain) {
  const cleanDomain = domain.trim().toLowerCase();

  if (!validateDomain(cleanDomain)) {
    const error = new Error("Invalid domain name");
    error.status = 400;
    throw error;
  }

  const result = {
    domain: cleanDomain,
    A: [],
    AAAA: [],
    MX: [],
    NS: [],
    TXT: [],
  };

  try {
    result.A = await dns.resolve4(cleanDomain);
  } catch {}

  try {
    result.AAAA = await dns.resolve6(cleanDomain);
  } catch {}

  try {
    result.MX = await dns.resolveMx(cleanDomain);
  } catch {}

  try {
    result.NS = await dns.resolveNs(cleanDomain);
  } catch {}

  try {
    result.TXT = await dns.resolveTxt(cleanDomain);
  } catch {}

  return result;
}

module.exports = {
  validateDomain,
  lookupDomain,
};
