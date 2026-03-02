const bcrypt = require("bcrypt");
const jwtUtil = require("../../config/jwt");
const userRepo = require("../../infrastructure/repositories/user.repository");
const refreshRepo = require("../../infrastructure/repositories/refresh.repository");

class AuthService {
  async register(data) {
    const { username, email, password } = data;

    const existing = await userRepo.findByUsername(username);
    if (existing) {
      throw new Error("Username already exists");
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await userRepo.createUser({
      username,
      email,
      password_hash: hashed,
      create_by: username,
    });

    return user;
  }

  async login(data) {
    const { username, password } = data;

    const user = await userRepo.findByUsername(username);
    if (!user) throw new Error("Invalid credentials");

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) throw new Error("Invalid credentials");

    const accessToken = jwtUtil.generateAccessToken(user);
    const refreshToken = jwtUtil.generateRefreshToken(user);

    return { user, accessToken, refreshToken };
  }
}

module.exports = new AuthService();