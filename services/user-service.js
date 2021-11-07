const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service.js");
const tokenService = require("./token-service.js");
const UserDto = require("../dto/user-dto.js");

class UserService {
  async registerUser(email, password) {
    const candidate = await User.find({ email });
    if (candidate) throw Error("User already exists!");
    const hashedPassword = await bcrypt.hashSync(password, 11);
    const activationLink = uuid.v4;
    const user = await User.create({
      activationLink,
      email,
      password: hashedPassword,
    });
    await mailService.sendActivationMail(email, activationLink);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    tokenService.saveToken(user.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
}
module.exports = new UserService();
