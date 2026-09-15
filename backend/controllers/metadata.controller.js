const metadataService = require("../services/metadata.service");

function analyzeMetadata(req, res, next) {
  try {
    const result = metadataService.analyzeFileMetadata(req.body);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  analyzeMetadata,
};
