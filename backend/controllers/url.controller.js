const urlService = require("../services/urlScanner.service");

function analyzeUrl(req, res, next) {
  try {
    const { url } = req.query;

    const result = urlService.analyzeUrl(url);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  analyzeUrl,
};
