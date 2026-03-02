const jwt = require("jsonwebtoken");
const jwtUtil = require("../../config/jwt");
const refreshRepo = require("../../infrastructure/repositories/refresh.repository");

exports.refresh = async (token) => {
  if (!token) throw new Error("No refresh token");

  const stored = await refreshRepo.find(token);
  if (!stored) throw new Error("Invalid refresh token");

  jwt.verify(token, process.env.JWT_REFRESH_SECRET);

  // rotation
  await refreshRepo.delete(token);

  const newAccess = jwtUtil.generateAccessToken({
    rowguid: stored.user_id,
  });

  const newRefresh = jwt.sign(
    { rowguid: stored.user_id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await refreshRepo.save(stored.user_id, newRefresh, expiresAt);

  return { newAccess, newRefresh };
};