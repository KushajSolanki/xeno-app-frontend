const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers["authorization"];

  if (!token) return res.status(401).json({ message: "Access denied. No token." });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.tenantId = verified.tenantId;
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token." });
  }
};
