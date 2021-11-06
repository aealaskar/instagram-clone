const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: { type: String, required: true },
    email: String,
    firstName: String,
    lastName: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserV2", UserSchema);
