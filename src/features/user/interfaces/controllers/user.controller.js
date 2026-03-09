const userService = require("../../application/services/user.service");

class UserController {
  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      res.locals.data = users;
      next();
    } catch (err) {
      next(err);
    }
  }

  async getUserById(req, res, next) {
    try {
      const id = req.params.id;
      const user = await userService.getUserById(id);
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        return next(error);
      }
      res.locals.data = user;
      next();
    } catch (err) {
      next(err);
    }
  }

  async createUser(req, res, next) {
    try {
      const user = await userService.createUser(req.body);
      res.locals.data = user;
      next();
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req, res, next) {
    try {
      const id = req.params.id;
      const user = await userService.updateUser(id, req.body);
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        return next(error);
      }
      res.locals.data = user;
      next();
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const id = req.params.id;
      const result = await userService.deleteUser(id);
      if (!result) {
        const error = new Error("User not found");
        error.statusCode = 404;
        return next(error);
      }
      res.locals.data = { message: "User deleted successfully" };
      next();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
