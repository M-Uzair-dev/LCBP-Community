const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: [true, "Name is required."],
  },
  phone: {
    type: "number",
    required: [true, "Phone number is required."],
    unique: [true, "This phone number is already in use."],
  },
  password: {
    type: "string",
    required: [true, "Password is required."],
  },
});

module.exports = mongoose.model("users", userSchema);
