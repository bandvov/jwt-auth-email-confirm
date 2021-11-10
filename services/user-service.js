const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service.js");
const tokenService = require("./token-service.js");
const UserDto = require("../dto/user-dto.js");
const ApiError = require("../exceptions/api-error.js");
const userModel = require("../models/userModel.js");
class UserService {
  async registerUser(email, password) {
    const candidate = await User.findOne({ email });

    if (candidate) throw ApiError.badRequest("User already exists!");
    const hashedPassword = await bcrypt.hashSync(password, 11);
    const activationLink = uuid.v4();
    const user = await User.create({
      activationLink,
      email,
      password: hashedPassword,
    });
    await mailService.sendActivationMail(
      email,
      `http://localhost:5000/api/activate/${activationLink}`
    );
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    tokenService.saveToken(user.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
  async login({ email, password }) {
    const user = await userModel.findOne({ email });
    if (!user) throw ApiError.badRequest("User not found");

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) throw ApiError.badRequest("Password not correct");
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    tokenService.saveToken(user.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
  async logout(token) {
    await tokenService.removeToken(token);
  }

  async activate(activationLink) {
    const user = await userModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.badRequest("Activation link is not correct");
    }
    user.isActivated = true;
    await user.save();
  }
  async refresh(refreshToken) {
    if (!refreshToken) throw ApiError.unauthorizedError();
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) throw ApiError.unauthorizedError();

    const user = await userModel.findById(userData._id);

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    tokenService.saveToken(user.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
  async getAllUsers() {
    return userModel.find({});
  }
}
module.exports = new UserService();
