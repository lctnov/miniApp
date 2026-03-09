const bcrypt = require("bcrypt");
const jwtUtil = require("../../../../shared/config/jwt");
const userRepo = require("../../infrastructure/repositories/user.repository");
const authRepo = require("../../infrastructure/repositories/auth.repository");

exports.login = async ({ username, password }) => {
  const user = await userRepo.findByUsername(username);
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) throw new Error("Invalid credentials");

  const accessToken = jwtUtil.generateAccessToken(user);
  const refreshToken = jwtUtil.generateRefreshToken(user);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await authRepo.save(user.rowguid, refreshToken, expiresAt);

  return { user, accessToken, refreshToken };
};
