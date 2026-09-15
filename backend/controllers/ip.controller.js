const ipService = require("../services/ip.service");

function getIpInfo(req, res, next) {
  try {
    const result = ipService.getIpInfo(req);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getIpInfo,
};
