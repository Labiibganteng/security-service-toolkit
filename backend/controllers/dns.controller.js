const dnsService = require("../services/dns.service");

async function lookupDomain(req, res, next) {
  try {
    const { domain } = req.query;

    const result = await dnsService.lookupDomain(domain);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  lookupDomain,
};
