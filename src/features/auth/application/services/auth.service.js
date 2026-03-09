const loginUsecase = require("../usecases/login.usecase");
const registerUsecase = require("../usecases/register.usecase");
const refreshUsecase = require("../usecases/refresh.usecase");

class AuthService {
  async register(data) {
    return await registerUsecase.register(data);
  }

  async login(data) {
    return await loginUsecase.login(data);
  }

  async refresh(refreshToken) {
    return await refreshUsecase.refresh(refreshToken);
  }
}

module.exports = new AuthService();
