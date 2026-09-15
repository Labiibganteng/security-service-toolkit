const domainService = require("../services/domain.service");

function getDomainInfo(req, res, next) {
  try {
    const { domain } = req.query;

    const result = domainService.getDomainInfo(domain);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getDomainInfo,
};
