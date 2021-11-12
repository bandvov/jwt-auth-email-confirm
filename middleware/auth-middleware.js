const ApiError = require("../exceptions/api-error");
const tokenService = require("../services/token-service");

module.exports = async function (req, res, next) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) next(ApiError.unauthorizedError());
    const accessToken = authorization.split(" ")[1];
    if (!accessToken) next(ApiError.unauthorizedError());
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) next(ApiError.unauthorizedError());
    req.user = userData;
    next();
  } catch (err) {
    return next(ApiError.unauthorizedError());
  }
};
