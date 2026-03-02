const bcrypt = require("bcrypt");
const userRepo = require("../../infrastructure/repositories/user.repository");

exports.register = async ({ username, email, password }) => {
  const existing = await userRepo.findByUsername(username);
  if (existing) throw new Error("Username already exists");

  const hashed = await bcrypt.hash(password, 10);

  return await userRepo.createUser({
    username,
    email,
    password_hash: hashed,
    create_by: username,
  });
};