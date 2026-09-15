const phoneService = require("../services/phone.service");

function getPhoneMetadata(req, res, next) {
  try {
    const { phone } = req.query;

    const result = phoneService.getPhoneMetadata(phone);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getPhoneMetadata,
};
