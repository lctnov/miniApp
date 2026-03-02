const bcrypt = require("bcrypt");
const jwtUtil = require("../../config/jwt");
const userRepo = require("../../infrastructure/repositories/user.repository");
const refreshRepo = require("../../infrastructure/repositories/refresh.repository");

exports.login = async ({ username, password }) => {
  const user = await userRepo.findByUsername(username);
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) throw new Error("Invalid credentials");

  const accessToken = jwtUtil.generateAccessToken(user);
  const refreshToken = jwtUtil.generateRefreshToken(user);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await refreshRepo.save(user.rowguid, refreshToken, expiresAt);

  return { accessToken, refreshToken };
};