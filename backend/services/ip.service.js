function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  return req.socket.remoteAddress || null;
}

function getIpInfo(req) {
  return {
    ip: getClientIp(req),
    source: "request",
  };
}

module.exports = {
  getClientIp,
  getIpInfo,
};
