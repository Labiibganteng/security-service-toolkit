const breachService = require("../services/breach.service");

async function checkEmailBreach(req, res, next) {
  try {
    const { email } = req.body;

    const result = await breachService.checkEmailBreach(email);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  checkEmailBreach,
};
