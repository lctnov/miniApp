const userRepo = require("../../infrastructure/repositories/user.repository");

class UserService {
  async getAllUsers() {
    return await userRepo.getAllUsers();
  }

  async getUserById(id) {
    return await userRepo.findById(id);
  }

  async createUser(data) {
    return await userRepo.createUser(data);
  }

  async updateUser(id, data) {
    return await userRepo.updateUser(id, data);
  }

  async deleteUser(id) {
    return await userRepo.deleteUser(id);
  }
}

module.exports = new UserService();
