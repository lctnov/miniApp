const authService = require("../../application/services/auth.service");

class AuthController {
  async register(req, res, next) {
    try {
      const user = await authService.register(req.body);
      res.locals.data = { user };
      next();
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const result = await authService.login(req.body);

      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });

      res.locals.data = {
        accessToken: result.accessToken,
        user: result.user,
      };

      next();
    } catch (err) {
      next(err);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const result = await authService.refresh(refreshToken);

      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });

      res.locals.data = {
        accessToken: result.accessToken,
        user: result.user,
      };

      next();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
