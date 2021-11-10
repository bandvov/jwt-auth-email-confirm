const ApiError = require("../exceptions/api-error");

module.exports = function (err, req, res, next) {
  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message, errors: err.errors });
  }
  console.log(err);
  res.status(500).json({ message: "Internal server error" });
};
