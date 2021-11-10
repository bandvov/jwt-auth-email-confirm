const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service.js");
const tokenService = require("./token-service.js");
const UserDto = require("../dto/user-dto.js");
const ApiError = require("../exceptions/api-error.js");
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
      `http://localhost:3000/activate/${activationLink}`
    );
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    tokenService.saveToken(user.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
  async activate(activationLink) {
    const user = UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.badRequest("Activation link is not correct");
    }
    user.isActivated = true;
    await user.save();
  }
}
module.exports = new UserService();
