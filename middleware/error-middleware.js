const ApiError = require("../exceptions/api-error");

module.exports = function (err, req, res, next) {
    console.log(err);
  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message, errors: err.errors });
  }
  res.status(500).json({ message: "Internal server error" });
};