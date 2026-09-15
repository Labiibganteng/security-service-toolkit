const breachService = require("../services/breach.service");

function prepareBreachCheck(req, res, next) {
  try {
    const { email } = req.body;

    const result = breachService.prepareBreachCheck(email);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  prepareBreachCheck,
};
