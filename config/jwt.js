const jwt = require("jsonwebtoken");

exports.generateAccessToken = (user) => {
  return jwt.sign(
    { rowguid: user.rowguid, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
};

exports.generateRefreshToken = (user) => {
  return jwt.sign(
    { rowguid: user.rowguid },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};