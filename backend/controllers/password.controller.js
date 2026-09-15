const passwordService = require("../services/password.service");

function analyzePassword(req, res, next) {
  try {
    const { password } = req.body;

    const result = passwordService.analyzePassword(password);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  analyzePassword,
};
