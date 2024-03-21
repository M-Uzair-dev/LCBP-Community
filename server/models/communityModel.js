const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
  name: {
    type: "string",
    required: [true, "Name is required."],
  },
});

module.exports = mongoose.model("communities", communitySchema);
