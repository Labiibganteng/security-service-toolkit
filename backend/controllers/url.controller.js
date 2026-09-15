const urlService = require("../services/urlScanner.service");

function getUrlInfo(req, res, next) {
  try {
    const { url } = req.query;

    const result = urlService.getUrlInfo(url);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUrlInfo,
};
