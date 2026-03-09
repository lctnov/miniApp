const jwt = require("jsonwebtoken");
const jwtUtil = require("../../../../shared/config/jwt");
const authRepo = require("../../infrastructure/repositories/auth.repository");
const userRepo = require("../../infrastructure/repositories/user.repository");

exports.refresh = async (token) => {
  if (!token) throw new Error("No refresh token");

  const stored = await authRepo.find(token);
  if (!stored) throw new Error("Invalid refresh token");

  jwt.verify(token, process.env.JWT_REFRESH_SECRET);

  // rotation
  await authRepo.delete(token);

  const user = await userRepo.findById(stored.user_id);

  const newAccess = jwtUtil.generateAccessToken(user);

  const newRefresh = jwt.sign(
    { rowguid: user.rowguid },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await authRepo.save(stored.user_id, newRefresh, expiresAt);

  return { user, accessToken: newAccess, refreshToken: newRefresh };
};
