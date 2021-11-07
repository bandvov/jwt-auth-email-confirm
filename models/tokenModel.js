const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const tokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  refreshToken: {
    type: String,
    required: true,
  },
});
module.exports = model("Token", tokenSchema);
