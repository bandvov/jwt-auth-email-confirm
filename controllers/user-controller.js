const userService = require("../services/user-service.js");

class UserController {
  async registration(req, res, next) {
    const { email, password } = req.body;
    try {
      const userData = await userService.registerUser(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async login(req, res, next) {
    try {
    } catch (error) {}
  }
  async logout(req, res, next) {
    try {
    } catch (error) {}
  }
  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.API_CLIENT_URL);
    } catch (error) {}
  }
  async refresh(req, res, next) {
    try {
    } catch (error) {}
  }
  async getUsers(req, res, next) {
    res.json(["one", "two", "three"]);
  }
}

module.exports = new UserController();
