const jwt = require("jsonwebtoken");

// ensure secrets exist
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}
if (!process.env.JWT_REFRESH_SECRET) {
  throw new Error("JWT_REFRESH_SECRET environment variable is required");
}

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

exports.verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

exports.verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};
